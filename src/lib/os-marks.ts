// OS and distro marks (24×24 SVG paths) for the quiz tiles and the share card. Brand paths from Simple Icons (CC0),
// imported by name so only these end up in the client bundle. Windows isn't in Simple Icons: the four-pane mark is drawn here.
import {
  siApple, siLinux, siFreebsd, siOpenbsd, siNetbsd, siArchlinux, siDebian, siUbuntu, siFedora, siNixos, siGentoo,
  siLinuxmint, siPopos, siOpensuse, siManjaro, siEndeavouros, siVoidlinux, siAlpinelinux, siKalilinux, siElementary,
  siZorin, siCachyos, siSlackware, siAsahilinux, siGarudalinux, siArtixlinux, siRedhat, siRockylinux, siAlmalinux,
  siDeepin, siKdeneon, siSolus, siQubesos, siTails, siSteamdeck, siDevuan, siParrotsecurity, siOmarchy, siKubuntu,
} from "simple-icons";

export type DesktopOS = "windows" | "macos" | "linux" | "bsd";
export interface Mark {
  id: string;
  label: string;
  /** 24×24 path, or null for a lettered badge. */
  path: string | null;
  /** Brand colour; null when the brand colour is black (unreadable on the dark card). */
  color: string | null;
  quip: string;
}

const WINDOWS_PATH = "M3 3h8.5v8.5H3zM12.5 3H21v8.5h-8.5zM3 12.5h8.5V21H3zM12.5 12.5H21V21h-8.5z";
type Si = { path: string; hex: string };
const lum = (hex: string) => { const n = parseInt(hex, 16); return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255; };
const m = (id: string, label: string, si: Si | null, quip: string, override?: string): Mark => ({
  id, label, quip, path: si?.path ?? null,
  color: override ?? (si && lum(si.hex) > 0.18 ? `#${si.hex}` : null),
});
const win = (id: string, label: string, quip: string): Mark => ({ id, label, quip, path: WINDOWS_PATH, color: "#0078D4" });

/** The generic mark for each quiz OS (quiz tiles, and the card when no variant is picked). */
export const OS_MARK: Record<DesktopOS, Mark> = {
  windows: win("windows", "Windows", "Just here for the games."),
  macos: m("macos", "macOS", siApple, "Courage."),
  linux: m("linux", "Linux", siLinux, "Year of the Linux desktop, any day now."),
  bsd: m("bsd", "BSD", siFreebsd, "It's not dead, it's just quiet."),
};

/** Variants you can flex on the card. First entry = generic. */
export const OS_VARIANTS: Record<DesktopOS, Mark[]> = {
  windows: [
    OS_MARK.windows,
    win("windows-11", "Windows 11", "Moved the Start button. Moved on."),
    win("windows-10", "Windows 10", "Extended Security Updates enjoyer."),
    win("windows-ltsc", "Windows LTSC", "Debloated it before it was cool."),
    win("windows-7", "Windows 7", "Aero Glass forever. Please update."),
  ],
  macos: [
    OS_MARK.macos,
    m("apple-silicon", "macOS on Apple Silicon", siApple, "18 hours of battery, 2 hours of doomscrolling."),
    m("intel-mac", "macOS on an Intel Mac", siApple, "Fans spinning, heart warm."),
    m("hackintosh", "Hackintosh", siApple, "Kexts held together with hope."),
  ],
  linux: [
    OS_MARK.linux,
    m("arch", "Arch Linux", siArchlinux, "I use Arch, btw."),
    m("debian", "Debian", siDebian, "Stable. Like, really stable. Like 2-years-old stable."),
    m("ubuntu", "Ubuntu", siUbuntu, "It just works. Mostly. Snaps, though."),
    m("kubuntu", "Kubuntu", siKubuntu, "Ubuntu, but make it KDE."),
    m("fedora", "Fedora", siFedora, "Bleeding edge, but with a seatbelt."),
    m("mint", "Linux Mint", siLinuxmint, "Windows refugee and happy about it."),
    m("popos", "Pop!_OS", siPopos, "Came for the NVIDIA drivers, stayed for COSMIC."),
    m("nixos", "NixOS", siNixos, "My config is reproducible. My sleep schedule isn't."),
    m("gentoo", "Gentoo", siGentoo, "Still compiling. Will reply after emerge."),
    m("opensuse", "openSUSE", siOpensuse, "The chameleon has seen things."),
    m("manjaro", "Manjaro", siManjaro, "Arch with training wheels (and that's fine)."),
    m("endeavouros", "EndeavourOS", siEndeavouros, "Arch, but the installer is nice to you."),
    m("cachyos", "CachyOS", siCachyos, "Every CPU cycle optimised. Every one."),
    m("garuda", "Garuda Linux", siGarudalinux, "Dragons, blur and 400 MB of themes."),
    m("omarchy", "Omarchy", siOmarchy, "Tiling windows and strong opinions."),
    m("void", "Void Linux", siVoidlinux, "No systemd. No problem. No regrets."),
    m("artix", "Artix Linux", siArtixlinux, "Arch minus systemd, plus principles."),
    m("devuan", "Devuan", siDevuan, "Debian, minus systemd, plus a grudge."),
    m("alpine", "Alpine Linux", siAlpinelinux, "musl and proud. 5 MB of attitude."),
    m("slackware", "Slackware", siSlackware, "Here since 1993. Not leaving."),
    m("asahi", "Asahi Linux", siAsahilinux, "Linux on an M-series Mac. Tim Cook is crying."),
    m("elementary", "elementary OS", siElementary, "macOS cosplay, but free."),
    m("zorin", "Zorin OS", siZorin, "Converted three relatives. Saint."),
    m("kde-neon", "KDE neon", siKdeneon, "Plasma, fresh off the press."),
    m("solus", "Solus", siSolus, "Independent and slightly mysterious."),
    m("deepin", "deepin", siDeepin, "Prettiest dock in the world."),
    m("rhel", "Red Hat Enterprise Linux", siRedhat, "Corporate approved. Ticket opened."),
    m("rocky", "Rocky Linux", siRockylinux, "CentOS lives on in our hearts."),
    m("alma", "AlmaLinux", siAlmalinux, "Enterprise vibes, community prices.", "#FFCB2B"),
    m("kali", "Kali Linux", siKalilinux, "Definitely not a hacker. Definitely."),
    m("parrot", "Parrot OS", siParrotsecurity, "Pentesting, but with a nicer wallpaper."),
    m("qubes", "Qubes OS", siQubesos, "Every tab in its own VM. Obviously."),
    m("tails", "Tails", siTails, "Forgets everything on reboot. Relatable."),
    m("steamos", "SteamOS", siSteamdeck, "Browsing between Elden Ring sessions."),
  ],
  bsd: [
    OS_MARK.bsd,
    m("freebsd", "FreeBSD", siFreebsd, "The power to serve."),
    m("openbsd", "OpenBSD", siOpenbsd, "Only two remote holes in the default install."),
    m("netbsd", "NetBSD", siNetbsd, "Of course it runs NetBSD. It runs on your toaster."),
    m("dragonfly", "DragonFly BSD", null, "HAMMER2 and zero hype.", "#7E57C2"),
    m("ghostbsd", "GhostBSD", null, "FreeBSD with a friendly face.", "#3A6EA5"),
  ],
};

export const findVariant = (os: string | null, id: string | null) =>
  (os && OS_VARIANTS[os as DesktopOS]?.find((v) => v.id === id)) || (os ? OS_MARK[os as DesktopOS] ?? null : null);
