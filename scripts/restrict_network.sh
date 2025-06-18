#!/bin/sh
# Restrict all network access using iptables
# Usage: sudo ./restrict_network.sh

set -e

if ! command -v iptables >/dev/null 2>&1; then
    echo "iptables not available. Cannot restrict network." >&2
    exit 1
fi

# Flush existing rules and set default policies to DROP
iptables -F
iptables -P INPUT DROP
iptables -P OUTPUT DROP

echo "Network access restricted. Use 'iptables -P INPUT ACCEPT' and 'iptables -P OUTPUT ACCEPT' to re-enable."
