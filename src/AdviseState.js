import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import patternDivider from "./images/pattern-divider-desktop.svg";
import dice from "./images/icon-dice.svg";
import axios from "axios";

const AdviseGenerator = () => {
  const [adviceData, setAdviceData] = useState({ id: "", advice: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      const { slip } = response.data;
      setAdviceData({ id: slip.id, advice: slip.advice });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-around my-56">
      <Card
        className="card-color"
        style={{
          width: 340,
        }}
      >
        <p className="flex justify-center heading-color text-xs tracking-widest">
          ADVICE #{adviceData.id}
        </p>
        <p className="py-4 text-center font-bold text-base">"{adviceData.advice}"</p>
        <div className="mb-1"></div>
        <img src={patternDivider} alt="Divider" style={{ width: "100%" }} />
        <div className="mb-4"></div>
        <div className="dice-color absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full py-2">
          <Button type="link" onClick={fetchAdvice}>
            <img src={dice} alt="Dice" style={{ width: "100%" }} />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdviseGenerator;
