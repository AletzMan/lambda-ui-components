"use client";
import React from "react";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import { Dropdown } from "../Dropdown/Dropdown";
import {
    Sun,
    Moon,
    Monitor,
    Sunset,
    Waves,
    Flower2,
    Leaf,
    Palette,
    Zap,
    Gem,
    Briefcase,
    Ghost,
} from "lucide-react";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";

export interface SwitchThemeProps {
    variant?: "solid" | "soft" | "subtle" | "text";
    size?: "tiny" | "small" | "medium" | "large";
    radius?: "tiny" | "small" | "medium" | "large";
    showLabel?: boolean;
}

export const SwitchTheme: React.FC<SwitchThemeProps> = ({
    variant = "soft",
    size = "small",
    radius = "small",
    showLabel = false,
}) => {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const themes = [
        { name: "light", label: "Light", icon: <Sun />, group: "Light Themes" },
        { name: "retro", label: "Retro", icon: <Palette />, group: "Light Themes" },
        { name: "lavender", label: "Lavender", icon: <Flower2 />, group: "Light Themes" },
        { name: "mint", label: "Mint", icon: <Leaf />, group: "Light Themes" },
        { name: "sunset", label: "Sunset", icon: <Sunset />, group: "Light Themes" },
        { name: "ocean", label: "Ocean", icon: <Waves />, group: "Light Themes" },
        { name: "dark", label: "Dark", icon: <Moon />, group: "Dark Themes" },
        { name: "slate", label: "Slate", icon: <Briefcase />, group: "Dark Themes" },
        {
            name: "deep-cosmic-night",
            label: "Deep Cosmic",
            icon: <Zap />,
            group: "Dark Themes",
        },
        {
            name: "soft-obsidian",
            label: "Obsidian",
            icon: <Ghost />,
            group: "Dark Themes",
        },
        { name: "graphite", label: "Graphite", icon: <Monitor />, group: "Dark Themes" },
        { name: "midnight", label: "Midnight", icon: <Gem />, group: "Dark Themes" },
    ];

    const currentTheme = themes.find((t) => t.name.toLowerCase() === theme!.toLowerCase()) || themes[0];

    if (!mounted) {
        return (
            <Button
                variant={variant}
                size={size}
                radius={radius}
                color="neutral"
                icon={<Sun />}
                aria-label="Switch theme"
                disabled
            >
                {showLabel ? "Theme" : null}
            </Button>
        );
    }

    return (
        <Dropdown
            variant={variant}
            size={size}
            radius={radius}
            icon={currentTheme.icon}
            text={showLabel ? currentTheme.label : undefined}
            aria-label="Switch theme"
        >
            <Divider contentPosition="start" ><span style={{ width: "100%" }}>Light </span></Divider>
            {themes
                .filter((t) => t.group === "Light Themes")
                .map((t) => (
                    <Dropdown.Item
                        key={t.name}
                        icon={t.icon}
                        text={t.label}
                        onSelectOption={() => setTheme(t.name)}
                        style={{
                            backgroundColor: theme === t.name ? "var(--lambda-color-cyan-100)" : undefined,
                            color: theme === t.name ? "var(--lambda-color-cyan-800)" : undefined,
                        }}
                    />
                ))}
            <Divider contentPosition="start" ><span style={{ width: "100%" }}>Dark</span></Divider>
            {themes
                .filter((t) => t.group === "Dark Themes")
                .map((t) => (
                    <Dropdown.Item
                        key={t.name}
                        icon={t.icon}
                        text={t.label}
                        onSelectOption={() => setTheme(t.name)}
                        style={{
                            backgroundColor: theme === t.name ? "var(--lambda-color-cyan-100)" : undefined,
                            color: theme === t.name ? "var(--lambda-color-cyan-800)" : undefined,
                        }}
                    />
                ))}
        </Dropdown>
    );
};
