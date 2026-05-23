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
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPicker from "@/components/Sidebar/ColorPicker";
import SidebarSection from "./SidebarSection";

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
    <div className="space-y-2 rounded-lg border border-white/5 bg-white/[0.03] p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={field.icon} className="h-3.5 w-3.5 text-indigo-400" />
          <Label className="text-xs text-slate-300">{field.label}</Label>
        </div>
        <Switch checked={field.enabled} onCheckedChange={field.onEnabledChange} />
      </div>
      <Input
        value={field.value}
        onChange={(e) => field.onValueChange(e.target.value)}
        placeholder={field.placeholder}
        disabled={!field.enabled}
        className="border-white/10 bg-white/5 text-sm text-slate-200 placeholder:text-slate-500 disabled:opacity-50"
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
    <>
      <div className="flex items-center justify-between border-b border-white/10 px-4 pb-4 pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-indigo-500 to-violet-500">
            <FontAwesomeIcon icon={faStore} className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold text-slate-100">Footer</p>
            <p className="truncate text-[11px] text-slate-400">
              Customize your footer
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="shrink-0 text-slate-400 hover:bg-white/5 hover:text-white"
          aria-label="Close sidebar"
        >
          <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 py-3">
        <SidebarSection id="content" icon={faStore} title="Content">
          <FooterFieldRow field={fields.name} />
          <FooterFieldRow field={fields.address} />
          <FooterFieldRow field={fields.phone} />
          <FooterFieldRow field={fields.email} />
        </SidebarSection>

        <SidebarSection id="colors" icon={faPalette} title="Style">
          <Tabs defaultValue="background">
            <TabsList className="grid w-full grid-cols-3 bg-white/5">
              <TabsTrigger value="background" className="text-[10px]">
                Background
              </TabsTrigger>
              <TabsTrigger value="text" className="text-[10px]">
                Text
              </TabsTrigger>
              <TabsTrigger value="links" className="text-[10px]">
                Links
              </TabsTrigger>
            </TabsList>

            <TabsContent value="background" className="mt-3">
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="h-6 w-6 shrink-0 rounded-md border border-white/10"
                  style={{ backgroundColor: backgroundColor }}
                />
                <span className="truncate text-xs text-slate-400">
                  {backgroundColor}
                </span>
              </div>
              <ColorPicker
                value={backgroundColor}
                onChange={onBackgroundColorChange}
                isMobile
              />
            </TabsContent>

            <TabsContent value="text" className="mt-3">
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="h-6 w-6 shrink-0 rounded-md border border-white/10"
                  style={{ backgroundColor: textColor }}
                />
                <span className="truncate text-xs text-slate-400">{textColor}</span>
              </div>
              <ColorPicker value={textColor} onChange={onTextColorChange} isMobile />
            </TabsContent>

            <TabsContent value="links" className="mt-3">
              <div className="mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faLink} className="h-3 w-3 text-indigo-400" />
                <div
                  className="h-6 w-6 shrink-0 rounded-md border border-white/10"
                  style={{ backgroundColor: linkColor }}
                />
                <span className="truncate text-xs text-slate-400">{linkColor}</span>
              </div>
              <ColorPicker value={linkColor} onChange={onLinkColorChange} isMobile />
            </TabsContent>
          </Tabs>
        </SidebarSection>
      </div>
    </>
  );
}
