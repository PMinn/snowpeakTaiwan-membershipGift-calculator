import { Card, CardHeader, CardBody, CardFooter, Divider, RadioGroup, Radio, cn } from "@nextui-org/react";

export default function Home() {

  const cards = [
    {
      name: '普通卡',
      image: '/card/card1.png',
    },
    {
      name: '銀卡',
      image: '/card/card2.png',
    },
    {
      name: '金卡',
      image: '/card/card3.png',
    },
    {
      name: '白金卡',
      image: '/card/card4.png',
    },
    {
      name: '黑卡',
      image: '/card/card5.png',
    },
    {
      name: '藍鑽卡',
      image: '/card/card6.png',
    }
  ]
  return (
    <main>
      <Card className="w-[86%] max-w-[500px] mx-auto">
        <CardHeader>
          1. 選擇會員卡等級
        </CardHeader>
        <CardBody>
          <Divider />
          <RadioGroup>
            {
              cards.map((card, index) => (
                <Radio
                  key={'Radio_' + index}
                  value={card.name}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  <div className="flex items-center">
                    <img src={card.image} alt="" className="w-[100px]" />
                    <div className="ms-5">{card.name}</div>
                  </div>
                </Radio>
              ))
            }
          </RadioGroup>
        </CardBody>
      </Card>
    </main>
  )
}
