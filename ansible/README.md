# Docker Installation with Ansible

This directory contains Ansible playbooks for installing Docker on Ubuntu 24.04 servers.

## Files

- `install-docker.yml`: Playbook for installing Docker and Docker Compose
- `inventory.ini`: Inventory file to define target servers

## Usage

1. Edit the `inventory.ini` file to add your Ubuntu 24.04 server details.

2. Run the playbook:

```bash
ansible-playbook -i inventory.ini install-docker.yml
```

## What the Playbook Does

The playbook performs the following tasks:

1. Updates the apt cache
2. Installs prerequisite packages
3. Adds Docker's official GPG key
4. Sets up Docker's apt repository
5. Installs Docker CE, Docker CLI, containerd.io, and Docker Compose plugin
6. Creates a docker group and adds the user to it
7. Installs Docker Compose from GitHub
8. Starts and enables the Docker service
9. Verifies the installation by checking versions and running a test container

## Requirements

- Ansible 2.9 or newer
- SSH access to target Ubuntu 24.04 servers
- Sudo privileges on target servers

## Note

This playbook is specifically designed for Ubuntu 24.04. It may need adjustments for other Ubuntu versions or Linux distributions.
