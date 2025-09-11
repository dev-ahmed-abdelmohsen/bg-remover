#!/bin/bash

# Docker Installation Script for Ubuntu
set -e  # Exit on any error

echo "================================================"
echo "    Docker Installation Script for Ubuntu"
echo "================================================"

# Function to print status messages
print_status() {
    echo -e "\n📋 $1"
}

# Function to check if command succeeded
check_success() {
    if [ $? -eq 0 ]; then
        echo "✅ Success: $1"
    else
        echo "❌ Failed: $1"
        exit 1
    fi
}

# Function to check if Docker is already installed
check_docker_installed() {
    if command -v docker &> /dev/null; then
        echo "ℹ️  Docker is already installed:"
        docker --version
        exit 0
    fi
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "❌ Please do not run this script as root. Run as a regular user."
    exit 1
fi

# Check if Ubuntu
if [ ! -f /etc/os-release ]; then
    echo "❌ This script is designed for Ubuntu only."
    exit 1
fi

source /etc/os-release
if [ "$ID" != "ubuntu" ]; then
    echo "❌ This script is designed for Ubuntu only. Detected: $ID"
    exit 1
fi

# Check if Docker is already installed
check_docker_installed

print_status "Updating package list..."
sudo apt update -y
check_success "Package list updated"

print_status "Installing prerequisites..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release
check_success "Prerequisites installed"

print_status "Adding Docker's official GPG key..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
check_success "Docker GPG key added"

print_status "Adding Docker repository..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
check_success "Docker repository added"

print_status "Updating package list with Docker repository..."
sudo apt update -y
check_success "Package list updated with Docker repo"

print_status "Installing Docker packages..."
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
check_success "Docker packages installed"

print_status "Adding current user to docker group..."
sudo usermod -aG docker $USER
check_success "User added to docker group"

print_status "Starting Docker service..."
sudo systemctl start docker
sudo systemctl enable docker
check_success "Docker service started and enabled"

print_status "Testing Docker installation..."
sleep 2  # Give Docker a moment to start

echo -e "\n🔍 Docker Version:"
docker --version
check_success "Docker version check"

echo -e "\n🔍 Docker Compose Version:"
docker compose version
check_success "Docker Compose version check"

print_status "Testing Docker with hello-world..."
docker run --rm hello-world
check_success "Docker hello-world test"

echo -e "\n================================================"
echo "🎉 Docker installation completed successfully!"
echo ""
echo "⚠️  Important: You need to log out and log back in"
echo "   for the group changes to take full effect."
echo ""
echo "   Alternatively, you can run:"
echo "   $ newgrp docker"
echo ""
echo "   Then test without sudo:"
echo "   $ docker ps"
echo "================================================"

# Optional: Apply group changes immediately
echo -e "\n💡 Applying group changes immediately..."
newgrp docker << EOFF
echo "Group changes applied. Testing Docker without sudo:"
docker ps
EOFF