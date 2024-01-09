import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio, cn, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Input } from "@nextui-org/react";
import { useSystem } from '@/contexts/System.js';
import { SunIcon } from "@/icons/SunIcon";
import { MoonIcon } from "@/icons/MoonIcon";
import { useState } from 'react';

export default function Home() {
  const { theme, setTheme } = useSystem();
  const [cardLevel, setCardLevel] = useState("cards_0");
  const [resultSteps, setResultSteps] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const numberComma = num => num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

  function priceToPoint(level, price) {
    return Math.round(price * cards[level].rewards);
  }

  function pointToPrice(level, point) {
    if (point < 0) return { min: 0, max: 0 };
    else if (point == 0) return { min: 0, max: Math.floor((point + 0.499999) / cards[level].rewards) };
    else return { min: Math.floor((point - 0.5) / cards[level].rewards), max: Math.floor((point + 0.499999) / cards[level].rewards) };
  }

  function calculate() {
    const levelUpInput = document.getElementById('levelUp');
    const pointsInput = document.getElementById('points');
    const giftPointsInput = document.getElementById('giftPoints');
    if (!levelUpInput.value || !pointsInput.value || !giftPointsInput.value) return;
    var hadLevelUp = false; // 有沒有升等過
    var levelUp = parseInt(levelUpInput.value); // 升等的金額
    var level = parseInt(cardLevel.replace('cards_', '')); // 目前等級
    var points = parseInt(pointsInput.value); // 已有點數
    var requirePoints = parseInt(giftPointsInput.value) - points; // 禮點

    var result = { min: 0, max: 0, points };
    var steps = [{
      action: '初始',
      price: '0',
      totalPrice: '0',
      points: '0',
      totalPoints: points,
    }];

    for (let i = level; i < cards.length; i++) {
      let levelUpPoints;
      if (!hadLevelUp) levelUpPoints = priceToPoint(i, levelUp);
      else levelUpPoints = priceToPoint(i, cards[i].levelUp);
      if (requirePoints >= levelUpPoints) { //會先升等
        result.points += levelUpPoints;
        if (!hadLevelUp) {
          result.max += levelUp;
          result.min += levelUp;
          steps.push({
            action: (
              <>
                <img src={cards[i].image} className="mt-1 w-[50px]" />
                {cards[i].name} ({Math.floor(cards[i].rewards * 100)}%)
              </>
            ),
            price: levelUp,
            // totalPrice: (result.min == result.max ? result.min : `${result.min}~${result.max}`),
            totalPrice: result.max,
            points: levelUpPoints,
            totalPoints: result.points,
          });
        } else {
          result.max += cards[i].levelUp;
          result.min += cards[i].levelUp;
          steps.push({
            action: (
              <>
                <img src={cards[i].image} className="mt-1 w-[50px]" />
                {cards[i].name} ({Math.floor(cards[i].rewards * 100)}%)
              </>
            ),
            price: cards[i].levelUp,
            // totalPrice: (result.min == result.max ? result.min : `${result.min}~${result.max}`),
            totalPrice: result.max,
            points: levelUpPoints,
            totalPoints: result.points,
          });
        }
        requirePoints -= levelUpPoints;
        hadLevelUp = true;
      } else {
        let tempPrice = pointToPrice(i, requirePoints);
        result.points += requirePoints;
        result.max += tempPrice.max;
        result.min += tempPrice.min;
        steps.push({
          action: (
            <>
              <img src={cards[i].image} className="mt-1 w-[50px]" />
              {cards[i].name} ({Math.floor(cards[i].rewards * 100)}%)
            </>
          ),
          // price: `${tempPrice.min}~${tempPrice.max}`,
          price: tempPrice.max,
          // totalPrice: (result.min == result.max ? result.min : `${result.min}~${result.max}`),
          totalPrice: result.max,
          points: requirePoints,
          totalPoints: result.points,
        });
        break;
      }
    }
    setResultSteps(steps);
    onOpen();
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
      <main className="flex flex-col items-center justify-center w-[90%] max-w-[450px] mx-auto py-10">
        <RadioGroup label="會員卡等級" className="w-full mb-5" value={cardLevel} onValueChange={setCardLevel}>
          {
            cards.map((card, index) => (
              <Radio
                key={'Radio_' + index}
                value={'cards_' + index}
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
          pattern="\d*"
          label="差多少金額升等"
          id="levelUp"
          labelPlacement="outside"
          placeholder=" "
          defaultValue="1000"
          min="1"
          step="1"
        />
        <Input
          className="mb-5"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">P</span>
            </div>
          }
          type="number"
          pattern="\d*"
          label="會員點數"
          id="points"
          labelPlacement="outside"
          placeholder=" "
          min="1"
          step="1"
          defaultValue="100"
        />
        <Input
          className="mb-5"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">P</span>
            </div>
          }
          type="number"
          pattern="\d*"
          label="兌換的會員禮點數"
          id="giftPoints"
          labelPlacement="outside"
          placeholder=" "
          min="1"
          step="1"
          defaultValue="3000"
        />
        <Button className="w-full block" color="primary" onClick={calculate}>計算</Button>
        {/* <div className="flex justify-between w-full">
          <div className="w-[49%]">
            <Button className="w-full block" color="default" onClick={() => { }}>清除</Button>
          </div>
          <div className="w-[49%]">
            <Button className="w-full block" color="primary" onClick={calculate}>計算</Button>
          </div>
        </div> */}
      </main >
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={theme} size="5xl" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">計算結果</ModalHeader>
              <ModalBody>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                    <TableColumn>新增點數</TableColumn>
                    <TableColumn>累積點數</TableColumn>
                    <TableColumn>消費金額</TableColumn>
                    <TableColumn>累積金額</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {
                      resultSteps &&
                      resultSteps.map((step, index) => (
                        <TableRow key={'step_' + index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="flex flex-col items-center justify-center min-w-[100px]">{step.action}</TableCell>
                          <TableCell className="text-center">{numberComma(step.points)}</TableCell>
                          <TableCell className="text-center">{numberComma(step.totalPoints)}</TableCell>
                          <TableCell className="text-center">{numberComma(step.price)}</TableCell>
                          <TableCell className={"text-center " + (index == resultSteps.length - 1 ? "text-danger text-xl font-black" : "")}>{numberComma(step.totalPrice)}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>關閉</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
