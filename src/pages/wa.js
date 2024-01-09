import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { useSystem } from '@/contexts/System.js';
import { SunIcon } from "@/icons/SunIcon";
import { MoonIcon } from "@/icons/MoonIcon";

export default function () {
  const { theme, setTheme } = useSystem();

  return (
    <>
      <Navbar position="static">
        <NavbarBrand>
          會員禮計算機
        </NavbarBrand>
        {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem></NavbarItem>
        </NavbarContent> */}
        <NavbarContent justify="end">
          <NavbarItem>
            {
              theme.includes('dark') ?
                <div className="cursor-pointer" onClick={() => setTheme('')}>
                  <SunIcon />
                </div>
                :
                <div className="cursor-pointer" onClick={() => setTheme(' dark text-foreground bg-background ')}>
                  <MoonIcon />
                </div>
            }
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className="flex flex-col items-center justify-center w-[90%] max-w-[450px] mx-auto py-10">
        <div className="text-center">1. <span className="text-danger">必須使用 Safari</span> 開啟網站，並點選下方分享按鈕</div>
        <br />
        <div className="relative">
          <img className="w-full" src="/WA/ios/1.png" alt="" />
          <div style={{ bottom: '3%', left: 'calc(50% - 16px)' }} className="absolute text-[32px]">👆</div>
        </div>
        <br />
        <br />
        2. 點選"加入主畫面"<br />
        <div className="relative">
          <img className="w-full" src="/WA/ios/2.png" alt="" />
          <div style={{ bottom: '4%', left: 'calc(50% - 16px)' }} className="absolute text-[32px]">👆</div>
        </div>
        <br />
        3. 點選"加入"<br />
        <div className="relative">
          <img className="w-full" src="/WA/ios/3.png" alt="" />
          <div style={{ top: '14%', right: '8%' }} className="absolute text-[32px]">👆</div>
        </div>
        <br />
        4. 可以在桌面上點選icon使用<br />
        <div className="relative">
          <img className="w-full" src="/WA/ios/4.png" alt="" />
        </div>
        <br />
      </main >
    </>
  )
}
