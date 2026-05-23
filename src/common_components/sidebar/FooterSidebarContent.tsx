"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLink,
  faLocationDot,
  faPalette,
  faPhone,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPicker from "@/components/Sidebar/ColorPicker";
import ColorFillPreview from "@/components/Sidebar/ColorFillPreview";
import SidebarSection from "./SidebarSection";
import {
  SidebarPanelBody,
  SidebarPanelHeader,
  SidebarShell,
  sidebarFieldClass,
  sidebarLabelClass,
  sidebarMutedClass,
} from "./SidebarLayout";
import { cn } from "@/lib/utils";

export interface FooterFieldConfig {
  label: string;
  value: string;
  enabled: boolean;
  onValueChange: (value: string) => void;
  onEnabledChange: (enabled: boolean) => void;
  placeholder: string;
  icon: typeof faStore;
}

export interface FooterSidebarContentProps {
  fields: {
    name: FooterFieldConfig;
    address: FooterFieldConfig;
    phone: FooterFieldConfig;
    email: FooterFieldConfig;
  };
  backgroundColor: string;
  onBackgroundColorChange: (value: string) => void;
  textColor: string;
  onTextColorChange: (value: string) => void;
  linkColor: string;
  onLinkColorChange: (value: string) => void;
  onClose: () => void;
}

function FooterFieldRow({ field }: { field: FooterFieldConfig }) {
  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800/50">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <FontAwesomeIcon
            icon={field.icon}
            className="h-4 w-4 shrink-0 text-indigo-500"
          />
          <Label className={cn(sidebarLabelClass, "truncate")}>{field.label}</Label>
        </div>
        <Switch checked={field.enabled} onCheckedChange={field.onEnabledChange} />
      </div>
      <Input
        value={field.value}
        onChange={(e) => field.onValueChange(e.target.value)}
        placeholder={field.placeholder}
        disabled={!field.enabled}
        className={cn(sidebarFieldClass, "disabled:opacity-50")}
      />
    </div>
  );
}

export default function FooterSidebarContent({
  fields,
  backgroundColor,
  onBackgroundColorChange,
  textColor,
  onTextColorChange,
  linkColor,
  onLinkColorChange,
  onClose,
}: FooterSidebarContentProps) {
  return (
    <SidebarShell>
      <SidebarPanelHeader
        title="Footer"
        subtitle="Customize your footer"
        icon={faStore}
        onClose={onClose}
      />

      <SidebarPanelBody>
        <SidebarSection id="content" icon={faStore} title="Content">
          <div className="space-y-3">
            <FooterFieldRow field={fields.name} />
            <FooterFieldRow field={fields.address} />
            <FooterFieldRow field={fields.phone} />
            <FooterFieldRow field={fields.email} />
          </div>
        </SidebarSection>

        <SidebarSection id="colors" icon={faPalette} title="Style">
          <Tabs defaultValue="background">
            <TabsList className="grid h-auto w-full grid-cols-3 gap-1 bg-muted p-1">
              <TabsTrigger value="background" className="px-1 text-[11px]">
                Background
              </TabsTrigger>
              <TabsTrigger value="text" className="px-1 text-[11px]">
                Text
              </TabsTrigger>
              <TabsTrigger value="links" className="px-1 text-[11px]">
                Links
              </TabsTrigger>
            </TabsList>

            <TabsContent value="background" className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <ColorFillPreview value={backgroundColor} />
                <span className={cn(sidebarMutedClass, "truncate")}>
                  {backgroundColor}
                </span>
              </div>
              <ColorPicker
                value={backgroundColor}
                onChange={onBackgroundColorChange}
                isMobile
              />
            </TabsContent>

            <TabsContent value="text" className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <ColorFillPreview value={textColor} variant="text" />
                <span className={cn(sidebarMutedClass, "truncate")}>{textColor}</span>
              </div>
              <ColorPicker value={textColor} onChange={onTextColorChange} isMobile />
            </TabsContent>

            <TabsContent value="links" className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLink} className="h-3.5 w-3.5 text-indigo-500" />
                <ColorFillPreview value={linkColor} variant="text" />
                <span className={cn(sidebarMutedClass, "truncate")}>{linkColor}</span>
              </div>
              <ColorPicker value={linkColor} onChange={onLinkColorChange} isMobile />
            </TabsContent>
          </Tabs>
        </SidebarSection>
      </SidebarPanelBody>
    </SidebarShell>
  );
}
