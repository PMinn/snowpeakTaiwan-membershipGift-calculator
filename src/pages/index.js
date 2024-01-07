import { Card, CardHeader, CardBody, CardFooter, Divider, RadioGroup, Radio, cn, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Input } from "@nextui-org/react";
import { useSystem } from '@/contexts/System.js';
import { SunIcon } from "@/icons/SunIcon";
import { MoonIcon } from "@/icons/MoonIcon";

export default function Home() {
  const { theme, setTheme } = useSystem();

  const cards = [
    {
      name: '普通卡',
      image: '/card/card1.png',
      levelUp: 25000,
      rewards: 0.02,
    },
    {
      name: '銀卡',
      image: '/card/card2.png',
      levelUp: 50000,
      rewards: 0.03,
    },
    {
      name: '金卡',
      image: '/card/card3.png',
      levelUp: 125000,
      rewards: 0.05,
    },
    {
      name: '白金卡',
      image: '/card/card4.png',
      levelUp: 250000,
      rewards: 0.06,
    },
    {
      name: '黑卡',
      image: '/card/card5.png',
      levelUp: 450000,
      rewards: 0.07,
    },
    {
      name: '藍鑽卡',
      image: '/card/card6.png',
      levelUp: Infinity,
      rewards: 0.08,
    }
  ]

  function priceToPoint(level, price) {
    return Math.round(price * cards[level].rewards);
  }

  function calculate() {
    console.log(priceToPoint(0, 180))
  }

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
      <main className="flex flex-col items-center justify-center w-[90%] max-w-[450px] mx-auto">
        <RadioGroup label="會員卡等級" defaultValue='card_0' className="w-full mb-5">
          {
            cards.map((card, index) => (
              <Radio
                key={'Radio_' + index}
                value={'card_' + index}
                classNames={{
                  base: cn(
                    "flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse min-w-full w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                  ),
                }}
              >
                <div className="flex items-center">
                  <img src={card.image} alt="" className="w-[50px]" />
                  <div className="ms-5">{card.name}</div>
                </div>
              </Radio>
            ))
          }
        </RadioGroup>
        <Input
          className="mb-5"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          type="number"
          label="差多少金額升等"
          labelPlacement="outside"
          placeholder=" "
        />
        <Input
          className="mb-5"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">P</span>
            </div>
          }
          type="number"
          label="會員點數"
          labelPlacement="outside"
          placeholder=" "
        />
        <Input
          className="mb-5"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">P</span>
            </div>
          }
          type="number"
          label="兌換的會員禮點數"
          labelPlacement="outside"
          placeholder=" "
        />
        <Button className="w-full" color="primary" onClick={calculate}>
          計算
        </Button>
      </main >
    </>
  )
}
