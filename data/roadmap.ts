// ============================================================================
// CYBERDRAGON PLATFORM - SECURITY ENGINEER ROADMAP (10 VOLUMES)
// ============================================================================

import type {
  CareerPath,
  Volume,
  Topic,
  Roadmap,
  Lab,
  Challenge,
} from "@/app/types";

// VOLUME 1: Mindset + Computer & Internet Foundations
const Volume1Topics: Topic[] = [
  { id: "v1-1", title: "What is a Computer", description: "Data, Hardware, Software, Input/Output devices", slug: "computer-basics", order: 1, estimatedHours: 2, skills: ["Computer Architecture"] },
  { id: "v1-2", title: "How Computers Process Data", description: "Binary, Bits & bytes, Number systems, Character encoding", slug: "data-processing", order: 2, estimatedHours: 2, skills: ["Binary", "Number Systems"] },
  { id: "v1-3", title: "What is an Operating System", description: "Kernel, User space, Processes, Memory management", slug: "os-basics", order: 3, estimatedHours: 2, skills: ["OS Concepts"] },
  { id: "v1-4", title: "Types of Operating Systems", description: "Desktop, Server, Mobile, Embedded OS", slug: "os-types", order: 4, estimatedHours: 1, skills: ["OS Knowledge"] },
  { id: "v1-5", title: "Windows OS Basics", description: "Architecture, NTFS, Registry, Services", slug: "windows-basics", order: 5, estimatedHours: 2, skills: ["Windows"] },
  { id: "v1-6", title: "Linux OS Basics", description: "Distributions, Shell, Package managers, Permissions", slug: "linux-intro", order: 6, estimatedHours: 2, skills: ["Linux"] },
  { id: "v1-7", title: "What is Software", description: "Application vs System software, Open source", slug: "software-types", order: 7, estimatedHours: 1, skills: ["Software"] },
  { id: "v1-8", title: "What is Programming", description: "Code, Compiled vs Interpreted, High-level vs Low-level", slug: "programming-intro", order: 8, estimatedHours: 1, skills: ["Programming"] },
  { id: "v1-9", title: "What is the Internet", description: "Network of networks, ISP, Client-server model", slug: "internet-basics", order: 9, estimatedHours: 1, skills: ["Internet"] },
  { id: "v1-10", title: "How the Internet Works", description: "IP address, DNS, Routing, Packets, Ports", slug: "internet-how", order: 10, estimatedHours: 2, skills: ["Internet Protocol"] },
  { id: "v1-11", title: "What is a Network", description: "LAN, WAN, MAN, PAN", slug: "network-intro", order: 11, estimatedHours: 1, skills: ["Networks"] },
  { id: "v1-12", title: "What is Cybersecurity", description: "Digital assets, Threats, Vulnerabilities, Risk", slug: "security-intro", order: 12, estimatedHours: 1, skills: ["Security Concepts"] },
  { id: "v1-13", title: "Types of Cyber Threats", description: "Malware, Virus, Worm, Trojan, Ransomware, Botnet", slug: "threat-types", order: 13, estimatedHours: 2, skills: ["Threat Analysis"] },
  { id: "v1-14", title: "Security Roles", description: "SOC Analyst, Security Engineer, Incident Responder", slug: "security-roles", order: 14, estimatedHours: 1, skills: ["Career Path"] },
];

// VOLUME 2: Operating Systems + Linux Foundations
const Volume2Topics: Topic[] = [
  { id: "v2-1", title: "Operating System Architecture", description: "Kernel, User space, System calls, Boot process", slug: "os-architecture", order: 1, estimatedHours: 2, skills: ["OS Architecture"] },
  { id: "v2-2", title: "Windows File System", description: "NTFS structure, Permissions, ACL", slug: "windows-filesystem", order: 2, estimatedHours: 2, skills: ["NTFS", "File Systems"] },
  { id: "v2-3", title: "Windows Users & Groups", description: "Local users, Domain users, User profiles", slug: "windows-users", order: 3, estimatedHours: 1, skills: ["Access Control"] },
  { id: "v2-4", title: "Windows Processes & Services", description: "Processes, Threads, Services, Startup programs", slug: "windows-processes", order: 4, estimatedHours: 2, skills: ["Process Management"] },
  { id: "v2-5", title: "Windows Registry", description: "Hives, Keys, Persistence locations", slug: "windows-registry", order: 5, estimatedHours: 2, skills: ["Windows Registry"] },
  { id: "v2-6", title: "Windows Event Logging", description: "Application, Security, and System logs", slug: "windows-logs", order: 6, estimatedHours: 1, skills: ["Logging"] },
  { id: "v2-7", title: "Linux File System Structure", description: "Root directories, /home, /etc, /var, /usr", slug: "linux-filesystem", order: 7, estimatedHours: 2, skills: ["Linux FS"] },
  { id: "v2-8", title: "Linux File Permissions", description: "rwx, chmod, chown, SUID, SGID", slug: "linux-permissions", order: 8, estimatedHours: 2, skills: ["Permissions"] },
  { id: "v2-9", title: "Linux Users & Groups", description: "useradd, passwd, groups management", slug: "linux-users", order: 9, estimatedHours: 1, skills: ["User Management"] },
  { id: "v2-10", title: "Linux Processes", description: "Foreground/background, Signals, Process tree", slug: "linux-processes", order: 10, estimatedHours: 2, skills: ["Process Control"] },
  { id: "v2-11", title: "Linux Package Management", description: "apt, yum, dnf, pacman", slug: "package-mgmt", order: 11, estimatedHours: 1, skills: ["Package Management"] },
  { id: "v2-12", title: "Security Hardening", description: "Patch management, Firewall rules, Disable services", slug: "hardening", order: 12, estimatedHours: 2, skills: ["Hardening"] },
];

// VOLUME 3: Networking From Zero
const Volume3Topics: Topic[] = [
  { id: "v3-1", title: "Network Fundamentals", description: "Network concepts, Client-server, Peer-to-peer", slug: "network-fundamentals", order: 1, estimatedHours: 1, skills: ["Networking"] },
  { id: "v3-2", title: "OSI Model", description: "7 layers of OSI model", slug: "osi-model", order: 2, estimatedHours: 2, skills: ["OSI Model"] },
  { id: "v3-3", title: "TCP/IP Model", description: "Network Interface, Internet, Transport, Application", slug: "tcp-ip-model", order: 3, estimatedHours: 2, skills: ["TCP/IP"] },
  { id: "v3-4", title: "IP Addressing", description: "IPv4, IPv6, Public/Private, Static/Dynamic", slug: "ip-addressing", order: 4, estimatedHours: 2, skills: ["IP Addressing"] },
  { id: "v3-5", title: "Subnetting", description: "CIDR, Subnet masks, Network/Broadcast addresses", slug: "subnetting", order: 5, estimatedHours: 2, skills: ["Subnetting"] },
  { id: "v3-6", title: "MAC Addressing", description: "MAC format, ARP", slug: "mac-addressing", order: 6, estimatedHours: 1, skills: ["MAC Addressing"] },
  { id: "v3-7", title: "Network Devices", description: "Router, Switch, Firewall, IDS/IPS", slug: "network-devices", order: 7, estimatedHours: 1, skills: ["Devices"] },
  { id: "v3-8", title: "Ports & Services", description: "Well-known, Registered, Dynamic ports", slug: "ports-services", order: 8, estimatedHours: 1, skills: ["Ports"] },
  { id: "v3-9", title: "Transport Protocols", description: "TCP, UDP", slug: "transport-protocols", order: 9, estimatedHours: 2, skills: ["Protocols"] },
  { id: "v3-10", title: "Application Protocols", description: "HTTP, HTTPS, FTP, DNS, SSH", slug: "app-protocols", order: 10, estimatedHours: 2, skills: ["Application Layer"] },
  { id: "v3-11", title: "DNS System", description: "DNS hierarchy, Record types, Resolution", slug: "dns-system", order: 11, estimatedHours: 1, skills: ["DNS"] },
  { id: "v3-12", title: "Routing", description: "Routing tables, Default gateway", slug: "routing", order: 12, estimatedHours: 1, skills: ["Routing"] },
  { id: "v3-13", title: "Firewall Basics", description: "Stateless vs Stateful, Rules", slug: "firewall", order: 13, estimatedHours: 1, skills: ["Firewalls"] },
  { id: "v3-14", title: "VPN Concepts", description: "Tunneling, Encryption", slug: "vpn", order: 14, estimatedHours: 1, skills: ["VPN"] },
  { id: "v3-15", title: "Network Monitoring", description: "Packet capture, Traffic analysis", slug: "network-monitoring", order: 15, estimatedHours: 1, skills: ["Monitoring"] },
];

// VOLUME 4: Programming From Zero (Python)
const Volume4Topics: Topic[] = [
  { id: "v4-1", title: "Programming Basics", description: "Programs, Scripts, Source code", slug: "programming-basics", order: 1, estimatedHours: 1, skills: ["Programming"] },
  { id: "v4-2", title: "Variables & Data Types", description: "Integer, Float, String, Boolean", slug: "variables-types", order: 2, estimatedHours: 1, skills: ["Data Types"] },
  { id: "v4-3", title: "Input & Output", description: "input(), print()", slug: "input-output", order: 3, estimatedHours: 1, skills: ["I/O"] },
  { id: "v4-4", title: "Operators", description: "Arithmetic, Comparison, Logical", slug: "operators", order: 4, estimatedHours: 1, skills: ["Operators"] },
  { id: "v4-5", title: "Conditional Statements", description: "if, else, elif", slug: "conditionals", order: 5, estimatedHours: 1, skills: ["Control Flow"] },
  { id: "v4-6", title: "Loops", description: "for, while", slug: "loops", order: 6, estimatedHours: 1, skills: ["Loops"] },
  { id: "v4-7", title: "Functions", description: "Defining functions, Return values", slug: "functions", order: 7, estimatedHours: 2, skills: ["Functions"] },
  { id: "v4-8", title: "Data Structures", description: "List, Tuple, Set, Dictionary", slug: "data-structures", order: 8, estimatedHours: 2, skills: ["Data Structures"] },
  { id: "v4-9", title: "File Handling", description: "Open, Read, Write, Append", slug: "file-handling", order: 9, estimatedHours: 1, skills: ["File I/O"] },
  { id: "v4-10", title: "Error Handling", description: "try, except, finally", slug: "error-handling", order: 10, estimatedHours: 1, skills: ["Exception Handling"] },
  { id: "v4-11", title: "Modules & Packages", description: "import, pip", slug: "modules", order: 11, estimatedHours: 1, skills: ["Modules"] },
  { id: "v4-12", title: "Object Oriented Programming", description: "Class, Object, Inheritance", slug: "oop", order: 12, estimatedHours: 2, skills: ["OOP"] },
  { id: "v4-13", title: "Regular Expressions", description: "Pattern matching", slug: "regex", order: 13, estimatedHours: 1, skills: ["Regex"] },
  { id: "v4-14", title: "APIs", description: "HTTP requests, JSON", slug: "apis", order: 14, estimatedHours: 1, skills: ["APIs"] },
  { id: "v4-15", title: "Security Libraries", description: "hashlib, cryptography", slug: "security-libs", order: 15, estimatedHours: 1, skills: ["Cryptography"] },
];

// VOLUME 5: Security Foundations
const Volume5Topics: Topic[] = [
  { id: "v5-1", title: "Information Security Principles", description: "CIA Triad, Defense in Depth, Zero Trust", slug: "security-principles", order: 1, estimatedHours: 1, skills: ["Security Concepts"] },
  { id: "v5-2", title: "Threat Landscape", description: "Malware, Ransomware, Phishing, DDoS", slug: "threats", order: 2, estimatedHours: 2, skills: ["Threat Analysis"] },
  { id: "v5-3", title: "Vulnerability Concepts", description: "CVE, CVSS, Exploit, Patch", slug: "vulnerabilities", order: 3, estimatedHours: 2, skills: ["Vulnerability Management"] },
  { id: "v5-4", title: "Attack Surface", description: "Network, Application, Human surface", slug: "attack-surface", order: 4, estimatedHours: 1, skills: ["Attack Surface"] },
  { id: "v5-5", title: "Authentication & Authorization", description: "Passwords, MFA, OAuth, Tokens", slug: "auth", order: 5, estimatedHours: 2, skills: ["Authentication"] },
  { id: "v5-6", title: "Cryptography Basics", description: "Symmetric, Asymmetric, Hashing, Digital signatures", slug: "crypto-basics", order: 6, estimatedHours: 2, skills: ["Cryptography"] },
  { id: "v5-7", title: "Web Security Basics", description: "OWASP Top 10, Cookies, Sessions, JWT", slug: "web-security-basics", order: 7, estimatedHours: 2, skills: ["Web Security"] },
  { id: "v5-8", title: "Network Security Basics", description: "Firewalls, IDS, IPS", slug: "network-security-basics", order: 8, estimatedHours: 1, skills: ["Network Security"] },
  { id: "v5-9", title: "Endpoint Security", description: "Antivirus, EDR", slug: "endpoint-security", order: 9, estimatedHours: 1, skills: ["Endpoint Defense"] },
  { id: "v5-10", title: "Logging & Monitoring", description: "Log sources, Centralized logging", slug: "logging-monitoring", order: 10, estimatedHours: 2, skills: ["Monitoring"] },
  { id: "v5-11", title: "Incident Response Basics", description: "Preparation, Detection, Containment, Recovery", slug: "incident-response", order: 11, estimatedHours: 2, skills: ["Incident Response"] },
  { id: "v5-12", title: "Security Policies", description: "Password, Access, Acceptable use policies", slug: "policies", order: 12, estimatedHours: 1, skills: ["Governance"] },
];

// VOLUME 6: Blue Team Core
const Volume6Topics: Topic[] = [
  { id: "v6-1", title: "SOC Operations", description: "SOC structure, Tiers", slug: "soc-ops", order: 1, estimatedHours: 1, skills: ["SOC"] },
  { id: "v6-2", title: "Log Sources", description: "Windows, Linux, Firewall, Proxy logs", slug: "log-sources", order: 2, estimatedHours: 2, skills: ["Log Analysis"] },
  { id: "v6-3", title: "SIEM Concepts", description: "Log ingestion, Correlation, Alerting", slug: "siem", order: 3, estimatedHours: 2, skills: ["SIEM"] },
  { id: "v6-4", title: "Detection Engineering", description: "Detection rules, Use cases, False positives", slug: "detection-eng", order: 4, estimatedHours: 2, skills: ["Detection"] },
  { id: "v6-5", title: "Threat Intelligence", description: "IOC, TTP, Kill Chain", slug: "threat-intel", order: 5, estimatedHours: 1, skills: ["Threat Intel"] },
  { id: "v6-6", title: "Malware Analysis", description: "Static, Dynamic analysis", slug: "malware-analysis", order: 6, estimatedHours: 2, skills: ["Malware Analysis"] },
  { id: "v6-7", title: "EDR & Telemetry", description: "Behavioral detection, Telemetry", slug: "edr-telemetry", order: 7, estimatedHours: 2, skills: ["EDR"] },
  { id: "v6-8", title: "Network Traffic Analysis", description: "PCAP, Protocol decoding", slug: "traffic-analysis", order: 8, estimatedHours: 2, skills: ["Network Analysis"] },
  { id: "v6-9", title: "Alert Triage", description: "Severity, Prioritization", slug: "alert-triage", order: 9, estimatedHours: 1, skills: ["Triage"] },
  { id: "v6-10", title: "Incident Response", description: "Isolation, Forensics, Reporting", slug: "incident-response-hands", order: 10, estimatedHours: 2, skills: ["Incident Response"] },
  { id: "v6-11", title: "Digital Forensics", description: "Disk imaging, Timeline analysis", slug: "forensics", order: 11, estimatedHours: 2, skills: ["Forensics"] },
  { id: "v6-12", title: "Threat Hunting", description: "Hypothesis-based hunting", slug: "threat-hunting", order: 12, estimatedHours: 2, skills: ["Threat Hunting"] },
];

// VOLUME 7: Cloud Security
const Volume7Topics: Topic[] = [
  { id: "v7-1", title: "Cloud Computing Basics", description: "IaaS, PaaS, SaaS, Shared responsibility", slug: "cloud-basics", order: 1, estimatedHours: 1, skills: ["Cloud"] },
  { id: "v7-2", title: "Cloud IAM", description: "Users, Roles, Policies", slug: "cloud-iam", order: 2, estimatedHours: 2, skills: ["IAM"] },
  { id: "v7-3", title: "Cloud Networking", description: "VPC, Subnets, Security Groups, NACL", slug: "cloud-networking", order: 3, estimatedHours: 2, skills: ["Cloud Networking"] },
  { id: "v7-4", title: "Cloud Compute", description: "VMs, Containers", slug: "cloud-compute", order: 4, estimatedHours: 1, skills: ["Compute"] },
  { id: "v7-5", title: "Cloud Storage Security", description: "Object storage, Encryption", slug: "cloud-storage", order: 5, estimatedHours: 1, skills: ["Storage"] },
  { id: "v7-6", title: "Cloud Logging", description: "Audit logs, Flow logs", slug: "cloud-logging", order: 6, estimatedHours: 1, skills: ["Logging"] },
  { id: "v7-7", title: "Container Security", description: "Image scanning, Runtime security", slug: "container-security", order: 7, estimatedHours: 2, skills: ["Containers"] },
  { id: "v7-8", title: "CI/CD Security", description: "Secrets management, Dependency scanning", slug: "cicd-security", order: 8, estimatedHours: 1, skills: ["CI/CD"] },
  { id: "v7-9", title: "Infrastructure as Code", description: "Terraform basics", slug: "iac", order: 9, estimatedHours: 1, skills: ["IaC"] },
  { id: "v7-10", title: "Cloud Attack Techniques", description: "Credential theft, Misconfiguration", slug: "cloud-attacks", order: 10, estimatedHours: 1, skills: ["Cloud Security"] },
];

// VOLUME 8: Automation & Engineering Skills
const Volume8Topics: Topic[] = [
  { id: "v8-1", title: "Scripting Automation", description: "Task, Log parsing, API interaction", slug: "automation", order: 1, estimatedHours: 2, skills: ["Automation"] },
  { id: "v8-2", title: "Version Control", description: "Git basics, Branches, Commits", slug: "git", order: 2, estimatedHours: 1, skills: ["Git"] },
  { id: "v8-3", title: "Data Formats", description: "JSON, YAML, XML", slug: "data-formats", order: 3, estimatedHours: 1, skills: ["Data Formats"] },
  { id: "v8-4", title: "API Security", description: "Authentication, Rate limiting", slug: "api-sec", order: 4, estimatedHours: 1, skills: ["API Security"] },
  { id: "v8-5", title: "Building Security Tools", description: "CLI, Web tools", slug: "security-tools", order: 5, estimatedHours: 2, skills: ["Tool Development"] },
  { id: "v8-6", title: "Automation Frameworks", description: "Ansible", slug: "frameworks", order: 6, estimatedHours: 1, skills: ["Frameworks"] },
  { id: "v8-7", title: "Task Scheduling", description: "Cron jobs", slug: "scheduling", order: 7, estimatedHours: 1, skills: ["Scheduling"] },
  { id: "v8-8", title: "Documentation", description: "Markdown", slug: "documentation", order: 8, estimatedHours: 1, skills: ["Documentation"] },
];

// VOLUME 9: Projects & Portfolio
const Volume9Topics: Topic[] = [
  { id: "v9-1", title: "Linux Projects", description: "Hardened server, Log monitoring", slug: "linux-projects", order: 1, estimatedHours: 3, skills: ["Linux"] },
  { id: "v9-2", title: "Network Projects", description: "Scanner, Packet sniffer", slug: "network-projects", order: 2, estimatedHours: 3, skills: ["Networking"] },
  { id: "v9-3", title: "Python Projects", description: "Password checker, Log analyzer", slug: "python-projects", order: 3, estimatedHours: 3, skills: ["Python"] },
  { id: "v9-4", title: "Web Security Projects", description: "Vulnerable app lab, Auth demo", slug: "web-projects", order: 4, estimatedHours: 3, skills: ["Web Security"] },
  { id: "v9-5", title: "SIEM Projects", description: "Centralized logging lab", slug: "siem-projects", order: 5, estimatedHours: 3, skills: ["SIEM"] },
  { id: "v9-6", title: "Cloud Projects", description: "Secure AWS environment", slug: "cloud-projects", order: 6, estimatedHours: 3, skills: ["Cloud"] },
  { id: "v9-7", title: "Automation Projects", description: "Auto alerting script", slug: "automation-projects", order: 7, estimatedHours: 2, skills: ["Automation"] },
  { id: "v9-8", title: "Documentation", description: "Blog posts, GitHub repos", slug: "docs-projects", order: 8, estimatedHours: 2, skills: ["Portfolio"] },
];

// VOLUME 10: Career Preparation
const Volume10Topics: Topic[] = [
  { id: "v10-1", title: "Cybersecurity Roles", description: "SOC, Security Engineer, Cloud, Detection, IR", slug: "cyber-roles", order: 1, estimatedHours: 1, skills: ["Career"] },
  { id: "v10-2", title: "Resume Building", description: "Format, Projects, Skills", slug: "resume", order: 2, estimatedHours: 1, skills: ["Resume"] },
  { id: "v10-3", title: "LinkedIn Optimization", description: "Headline, About, Posts", slug: "linkedin", order: 3, estimatedHours: 1, skills: ["LinkedIn"] },
  { id: "v10-4", title: "GitHub Profile", description: "Repos, Readme", slug: "github", order: 4, estimatedHours: 1, skills: ["GitHub"] },
  { id: "v10-5", title: "Interview Preparation", description: "Linux, Networking, Security questions", slug: "interviews", order: 5, estimatedHours: 2, skills: ["Interviews"] },
  { id: "v10-6", title: "Certifications", description: "Security+, Blue Team Level 1, AWS", slug: "certifications", order: 6, estimatedHours: 1, skills: ["Certifications"] },
  { id: "v10-7", title: "Job Search", description: "Internships, Job portals, Career pages", slug: "job-search", order: 7, estimatedHours: 1, skills: ["Job Search"] },
  { id: "v10-8", title: "Continuous Learning", description: "Blogs, Research papers, Communities", slug: "continuous-learning", order: 8, estimatedHours: 1, skills: ["Learning"] },
  { id: "v10-9", title: "Personal Branding", description: "Blogging, YouTube, Platform building", slug: "personal-branding", order: 9, estimatedHours: 1, skills: ["Branding"] },
];

// Volumes
export const Volumes: Volume[] = [
  {
    id: "vol-1",
    title: "Mindset + Computer & Internet Foundations",
    description: "Human → Computer → Internet → Cybersecurity Foundations",
    slug: "foundations",
    order: 1,
    topics: Volume1Topics,
    estimatedHours: 22,
  },
  {
    id: "vol-2",
    title: "Operating Systems + Linux Foundations",
    description: "Operating Systems Deep Dive (Windows + Linux)",
    slug: "os-linux",
    order: 2,
    topics: Volume2Topics,
    estimatedHours: 21,
  },
  {
    id: "vol-3",
    title: "Networking From Zero",
    description: "Master networking concepts and protocols",
    slug: "networking",
    order: 3,
    topics: Volume3Topics,
    estimatedHours: 23,
  },
  {
    id: "vol-4",
    title: "Programming From Zero (Python)",
    description: "Learn Python for security automation",
    slug: "programming",
    order: 4,
    topics: Volume4Topics,
    estimatedHours: 20,
  },
  {
    id: "vol-5",
    title: "Security Foundations",
    description: "Core security concepts and principles",
    slug: "security-foundations",
    order: 5,
    topics: Volume5Topics,
    estimatedHours: 19,
  },
  {
    id: "vol-6",
    title: "Blue Team Core",
    description: "Defensive security and operations",
    slug: "blue-team",
    order: 6,
    topics: Volume6Topics,
    estimatedHours: 21,
  },
  {
    id: "vol-7",
    title: "Cloud Security",
    description: "Cloud & DevOps Security",
    slug: "cloud-security",
    order: 7,
    topics: Volume7Topics,
    estimatedHours: 15,
  },
  {
    id: "vol-8",
    title: "Automation & Engineering Skills",
    description: "Scripting, DevOps, and tool development",
    slug: "automation",
    order: 8,
    topics: Volume8Topics,
    estimatedHours: 12,
  },
  {
    id: "vol-9",
    title: "Projects & Portfolio",
    description: "Build real-world security projects",
    slug: "projects",
    order: 9,
    topics: Volume9Topics,
    estimatedHours: 20,
  },
  {
    id: "vol-10",
    title: "Career & Industry Preparation",
    description: "Land your first cybersecurity job",
    slug: "career",
    order: 10,
    topics: Volume10Topics,
    estimatedHours: 10,
  },
];

// Career Paths
export const CareerPaths: CareerPath[] = [
  {
    id: "path-security-engineer",
    title: "Security Engineer",
    description: "Master comprehensive security engineering and architecture",
    slug: "security-engineer",
    icon: "🛡️",
    level: "intermediate",
    volumes: Volumes,
    skills: [
      "Security Architecture",
      "Blue Team Operations",
      "Cloud Security",
      "Automation",
      "Incident Response",
    ],
    jobRoles: ["Security Engineer", "Security Architect", "Security Specialist"],
    estimatedWeeks: 48,
  },
];

// Main Roadmap
export const MainRoadmap: Roadmap = {
  id: "roadmap-main",
  title: "CyberDragon Cybersecurity Learning Path",
  description: "Comprehensive cybersecurity learning journey",
  slug: "cybersecurity",
  careerPaths: CareerPaths,
  featured: true,
  order: 1,
};

// Labs
export const Labs: Lab[] = [
  {
    id: "lab-1",
    title: "Setting up Kali Linux",
    description: "Install and configure Kali Linux for penetration testing",
    slug: "kali-setup",
    difficulty: "beginner",
    type: "guided",
    content: "Learn how to set up Kali Linux...",
    instructions:
      "Follow these steps to install Kali Linux in a VM...",
    estimatedTime: 30,
    environment: "vm",
    topicId: "topic-linux-1",
    order: 1,
  },
  {
    id: "lab-2",
    title: "Network Reconnaissance",
    description: "Practice network scanning and enumeration",
    slug: "network-recon",
    difficulty: "intermediate",
    type: "guided",
    content: "Learn reconnaissance techniques...",
    instructions: "Use nmap to scan networks...",
    estimatedTime: 45,
    environment: "browser",
    topicId: "topic-net-5",
    order: 1,
  },
  {
    id: "lab-3",
    title: "SQL Injection Challenge",
    description: "Exploit SQL injection vulnerabilities",
    slug: "sql-injection",
    difficulty: "intermediate",
    type: "challenge",
    content: "Challenge lab for SQL injection...",
    instructions: "Exploit the vulnerable application...",
    estimatedTime: 60,
    environment: "browser",
    topicId: "topic-sec-2",
    order: 2,
  },
];

// Challenges
export const Challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Find the Hidden Flag",
    description: "Use web reconnaissance to find hidden flags",
    slug: "find-flag",
    difficulty: "beginner",
    problem:
      "A website has hidden flags scattered throughout. Find all 5 flags...",
    hints: [
      "Check HTML comments",
      "Look at robots.txt",
      "Check DNS records",
    ],
    estimatedTime: 45,
    topicId: "topic-web-1",
    resources: [],
  },
  {
    id: "challenge-2",
    title: "Bypass Authentication",
    description: "Bypass weak authentication mechanisms",
    slug: "bypass-auth",
    difficulty: "intermediate",
    problem: "Log in without valid credentials...",
    hints: [
      "Check for default credentials",
      "Look for SQL injection",
      "Check for weak validation",
    ],
    estimatedTime: 90,
    topicId: "topic-sec-2",
    resources: [],
  },
];
