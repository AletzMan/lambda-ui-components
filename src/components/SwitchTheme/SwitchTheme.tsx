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

export interface SwitchThemeProps {
    variant?: "solid" | "soft" | "subtle" | "text";
    size?: "small" | "medium" | "large";
    showLabel?: boolean;
}

export const SwitchTheme: React.FC<SwitchThemeProps> = ({
    variant = "soft",
    size = "medium",
    showLabel = false,
}) => {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const themes = [
        { name: "light", label: "Light", icon: <Sun size={16} />, group: "Light Themes" },
        { name: "retro", label: "Retro", icon: <Palette size={16} />, group: "Light Themes" },
        { name: "lavender", label: "Lavender", icon: <Flower2 size={16} />, group: "Light Themes" },
        { name: "mint", label: "Mint", icon: <Leaf size={16} />, group: "Light Themes" },
        { name: "sunset", label: "Sunset", icon: <Sunset size={16} />, group: "Light Themes" },
        { name: "ocean", label: "Ocean", icon: <Waves size={16} />, group: "Light Themes" },
        { name: "dark", label: "Dark", icon: <Moon size={16} />, group: "Dark Themes" },
        { name: "slate", label: "Slate", icon: <Briefcase size={16} />, group: "Dark Themes" },
        {
            name: "deep-cosmic-night",
            label: "Deep Cosmic",
            icon: <Zap size={16} />,
            group: "Dark Themes",
        },
        {
            name: "soft-obsidian",
            label: "Obsidian",
            icon: <Ghost size={16} />,
            group: "Dark Themes",
        },
        { name: "graphite", label: "Graphite", icon: <Monitor size={16} />, group: "Dark Themes" },
        { name: "midnight", label: "Midnight", icon: <Gem size={16} />, group: "Dark Themes" },
    ];

    const currentTheme = themes.find((t) => t.name === theme) || themes[0];

    if (!mounted) {
        return (
            <Button
                variant={variant}
                size={size}
                icon={<Sun size={16} />}
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
            icon={currentTheme.icon}
            text={showLabel ? currentTheme.label : undefined}
            aria-label="Switch theme"
        >
            <div style={{ padding: "4px 8px", fontSize: "12px", opacity: 0.7, fontWeight: 600 }}>
                Light Themes
            </div>
            {themes
                .filter((t) => t.group === "Light Themes")
                .map((t) => (
                    <Dropdown.Item
                        key={t.name}
                        icon={t.icon}
                        text={t.label}
                        onSelectOption={() => setTheme(t.name)}
                        style={{
                            backgroundColor: theme === t.name ? "var(--lambda-color-primary-100)" : undefined,
                            color: theme === t.name ? "var(--lambda-color-primary-800)" : undefined,
                        }}
                    />
                ))}
            <div
                style={{
                    padding: "4px 8px",
                    fontSize: "12px",
                    opacity: 0.7,
                    fontWeight: 600,
                    marginTop: "8px",
                }}
            >
                Dark Themes
            </div>
            {themes
                .filter((t) => t.group === "Dark Themes")
                .map((t) => (
                    <Dropdown.Item
                        key={t.name}
                        icon={t.icon}
                        text={t.label}
                        onSelectOption={() => setTheme(t.name)}
                        style={{
                            backgroundColor: theme === t.name ? "var(--lambda-color-primary-100)" : undefined,
                            color: theme === t.name ? "var(--lambda-color-primary-800)" : undefined,
                        }}
                    />
                ))}
        </Dropdown>
    );
};
