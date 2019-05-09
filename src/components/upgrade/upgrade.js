import React from "react";
import { Link } from "react-router-dom";
import StripeBtn from "../Stripe/stripeBtn";
import "./upgrade.scss";

function Upgrade(props) {
  return (
    <div className="border-upgrade">
      <h1 className="upgrade-title"> Upgrade</h1>
      <div className="upgrade">
        <h3>
          Upgrade to our Masters Membership to receive discounted rates and be
          entered into a raffle to win a Trip of a lifetime to Scotland to Play
          at hsitoric st. Andrews Golf Course
        </h3>
        <StripeBtn className="upg" />
      </div>

      <div />
    </div>
  );
}

export default Upgrade;
