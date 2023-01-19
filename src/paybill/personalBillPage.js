import React, { useState } from "react";
import DebtCard from "./components/debtCard";

const PersonalBillPage = () => {
  return (
  <div class="h-screen">
    <h1>personalBillPage</h1>
  <div class="h-96 carousel carousel-vertical rounded-box">
    <div class="carousel-item h-full">
      <DebtCard></DebtCard>  </div>  
    </div>
  </div>
  );
};
export default PersonalBillPage;
