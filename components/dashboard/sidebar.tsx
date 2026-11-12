"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChartLineData01Icon,
  Coins01Icon,
  Invoice01Icon,
  Folder01Icon,
  HelpCircleIcon,
  Settings01Icon,
  ArrowRight01Icon,
  ArrowDown01Icon,
  MoreHorizontalIcon,
  Logout01Icon,
  UserIcon,
  Globe02Icon,
  Car01Icon,
} from "@hugeicons/core-free-icons";

export type AdminTab = "products" | "taxes" | "documents";

interface DashboardSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  productsCount: number;
  adminEmail?: string;
  onLogout?: () => void;
}

export function DashboardSidebar({
  activeTab,
  onSelectTab,
  productsCount,
  adminEmail = "namaagrowthagency@gmail.com",
  onLogout,
  ...props
}: DashboardSidebarProps) {
  const [foldersOpen, setFoldersOpen] = React.useState(true);

  const menuItems = [
    {
      id: "products" as AdminTab,
      title: "إدارة المنتجات والسيارات",
      icon: Car01Icon,
      badge: `${productsCount}`,
    },
    {
      id: "taxes" as AdminTab,
      title: "حاسبة الضرائب والجمارك",
      icon: Coins01Icon,
      badge: "23-74",
    },
    {
      id: "documents" as AdminTab,
      title: "مولد الوصولات والعقود",
      icon: Invoice01Icon,
      badge: "PDF",
    },
  ];

  const showrooms = [
    { name: "صالة العاصمة (المحمدية)", code: "alger" },
    { name: "صالة جيجل (بوالرمل)", code: "jijel" },
    { name: "صالة ورقلة (الوسط)", code: "ouergla" },
  ];

  return (
    <Sidebar collapsible="offExamples" className="lg:border-r-0!" {...props}>
      {/* Brand Header */}
      <SidebarHeader className="p-3 sm:p-4 lg:p-5 pb-0">
        <div className="flex items-center gap-2.5">
          <div className="relative size-7 rounded-lg overflow-hidden border border-border bg-black shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="CARVEX"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div>
            <span className="font-bold text-sm tracking-wide block leading-none text-foreground">
              CARVEX EXPORT
            </span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">
              لوحة الإدارة المركزية
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 sm:px-4 lg:px-5">
        {/* Dealership Workspace Badge */}
        <div className="flex items-center gap-2 sm:gap-3 rounded-lg border bg-card p-2 sm:p-2.5 mb-3 sm:mb-4">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0 font-bold text-xs">
            CX
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-xs sm:text-sm truncate">وكالة Carvex الجزائر</p>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-[10px] sm:text-xs">3 صالات وميناء جن جن</span>
            </div>
          </div>
        </div>

        {/* Main Navigation Menu */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-0 text-[10px] sm:text-[11px] font-semibold tracking-wider text-muted-foreground">
            الوحدات التشغيلية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-1 space-y-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSelectTab(item.id)}
                      isActive={isActive}
                      className="h-9 sm:h-[38px] cursor-pointer"
                    >
                      <HugeiconsIcon
                        icon={item.icon}
                        className={`size-4 sm:size-5 ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-xs sm:text-sm font-medium flex-1">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <HugeiconsIcon
                          icon={ArrowRight01Icon}
                          className="size-3.5 text-primary opacity-80"
                        />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Showrooms & Branches Collapsible */}
        <Collapsible open={foldersOpen} onOpenChange={setFoldersOpen} className="mt-4">
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="flex items-center justify-between px-0 text-[10px] sm:text-[11px] font-semibold tracking-wider text-muted-foreground">
              <CollapsibleTrigger className="flex items-center gap-1.5 cursor-pointer">
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  className={`size-3 sm:size-3.5 transition-transform ${
                    foldersOpen ? "" : "-rotate-90"
                  }`}
                />
                الصالات والفروع
              </CollapsibleTrigger>
              <HugeiconsIcon
                icon={MoreHorizontalIcon}
                className="size-4 cursor-pointer hover:text-foreground transition-colors"
              />
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="mt-2 space-y-0.5">
                  {showrooms.map((branch) => (
                    <SidebarMenuItem key={branch.code}>
                      <SidebarMenuButton
                        onClick={() => onSelectTab("products")}
                        className="h-8 sm:h-9 cursor-pointer"
                      >
                        <HugeiconsIcon
                          icon={Folder01Icon}
                          className="size-3.5 sm:size-4 text-muted-foreground"
                        />
                        <span className="flex-1 text-muted-foreground text-xs truncate">
                          {branch.name}
                        </span>
                        <div className="size-1.5 rounded-full bg-primary shrink-0" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      {/* Sidebar Footer with Admin Profile & Logout */}
      <SidebarFooter className="px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4 lg:pb-5">
        <Link
          href="/inventory"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md border border-border bg-background hover:bg-muted shadow-xs text-xs font-medium w-full mt-2 transition-colors"
        >
          <HugeiconsIcon icon={Globe02Icon} className="size-3.5" />
          <span>معاينة الموقع للجمهور</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg cursor-pointer hover:bg-accent transition-colors mt-2">
                <Avatar className="size-7 sm:size-8">
                  <AvatarFallback className="text-xs bg-primary/20 text-primary font-bold">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-xs sm:text-sm truncate">المشرف المركزي</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                    {adminEmail}
                  </p>
                </div>
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  className="size-4 text-muted-foreground shrink-0"
                />
              </div>
            }
          />
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem onClick={onLogout} className="text-destructive cursor-pointer">
              <HugeiconsIcon icon={Logout01Icon} className="size-4 mr-2" />
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
