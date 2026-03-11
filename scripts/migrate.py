import toml
import subprocess
import sys
import os
from pathlib import Path

toml_path = Path(__file__).parent.parent / "kestrel.toml"
with open(toml_path) as f:
    conf = toml.load(f)

database_url = conf["database"]["postgres"]["url"]

env = os.environ.copy()
env["DATABASE_URL"] = database_url

try:
    subprocess.run(
        ["npx", "node-pg-migrate", "up"],
        check=True,
        env=env,
        shell=True,
    )
except subprocess.CalledProcessError as e:
    print("Migration failed:", e)
    sys.exit(1)