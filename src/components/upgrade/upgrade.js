import React from "react";
import { Link } from "react-router-dom";
import StripeBtn from "../Stripe/stripeBtn";
import "./upgrade.scss";

function Upgrade(props) {
  return (
    <div className="border-upgrade">
      <div className="upgrade">
        <h1 className="title">Upgrade</h1>
        <p className="c">
          Upgrade to our Masters Membership to receive discounted rates and be
          entered into a raffle to win a Trip of a lifetime to Scotland to Play
          at hsitoric st. Andrews Golf Course
        </p>
        <StripeBtn className="upg" />
      </div>

      <div />
    </div>
  );
}

export default Upgrade;
