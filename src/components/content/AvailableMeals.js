'use client';
import { useEffect, useState, useRef } from "react";
import MealItem from "./MealItem";
import { useCartContext } from "../context/cart-context";
import { useParams } from "next/navigation";
import theGoldenSpoonMenu from "../../data/theGoldenSpoon.json";
import devaDaDhabaMenu from "../../data/devaDaDhaba.json";
import configData from "../../data/config.json";
import SubscriptionDialog from "../dialogs/SubscriptionDialog";
import "./categories.css";

const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const AvailableMeals = () => {
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { allMenuItems, setAllMenuItems, setCurrentHotel } = useCartContext();
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [freeTrialExpireToday, setFreeTrialExpireToday] = useState(false);
  const [subscriptionExpireToday, setSubscriptionExpireToday] = useState(false);
  const params = useParams();
  const hotelInUrl = params.hotel;

  const handleScroll = (e) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  useEffect(() => {
    const today = new Date();
    const currentData = configData[hotelInUrl];
    if (currentData) {
      const todayDateOnly = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const expiryDate = parseDate(currentData.expiryDate);
      const trialEndDate = parseDate(currentData.trialEndDate);

      const isExpiryTodayOrPast =
        expiryDate && todayDateOnly >= expiryDate && expiryDate > trialEndDate;
      const isTrialEndTodayOrPast =
        trialEndDate && todayDateOnly >= trialEndDate &&
        trialEndDate.getTime() === expiryDate.getTime();

      if (isTrialEndTodayOrPast) {
        setFreeTrialExpireToday(true);
        setSubscriptionExpireToday(false);
      } else if (isExpiryTodayOrPast) {
        setSubscriptionExpireToday(true);
        setFreeTrialExpireToday(false);
      } else {
        setSubscriptionExpireToday(false);
        setFreeTrialExpireToday(false);
      }

      if (hotelInUrl === "the-golden-spoon") {
        setAllMenuItems(theGoldenSpoonMenu);
        setCurrentHotel("the-golden-spoon");
      } else if (hotelInUrl === "deva-da-dhaba") {
        setAllMenuItems(devaDaDhabaMenu);
        setCurrentHotel("deva-da-dhaba");
      }
    }
  }, [params.hotel, setAllMenuItems, setCurrentHotel, hotelInUrl]);

  useEffect(() => {
    if (allMenuItems.length > 0) {
      setMeals(allMenuItems);
      const filteredCategories = [];
      allMenuItems.forEach((item) => {
        if (item.category && !filteredCategories.includes(item.category)) {
          filteredCategories.push(item.category);
        }
      });
      setCategories(filteredCategories);
      setIsLoading(false);
    }
  }, [allMenuItems]);

  useEffect(() => {
    if (subscriptionExpireToday || freeTrialExpireToday) {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  }, [subscriptionExpireToday, freeTrialExpireToday]);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      img={meal.img}
      alt={meal.alt}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  const handleItemsFilter = (cate) => {
    if (cate === "All") {
      setMeals(allMenuItems);
    } else {
      setMeals(allMenuItems.filter((item) => item.category === cate));
    }
    setSelectedCategory(cate);
  };

  if (isLoading) {
    return (
      <section className="text-center p-8">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto p-4 pb-24">
      <div
        className="category-container mb-4"
        ref={containerRef}
        onWheel={handleScroll}
      >
        <button
          className={selectedCategory === "All" ? "active" : ""}
          onClick={() => handleItemsFilter("All")}
        >
          Show All Items
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => handleItemsFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="card">
        <ul className="divide-y divide-gray-200">{mealsList}</ul>
      </div>

      <SubscriptionDialog
        open={dialogOpen}
        freeTrialExpireToday={freeTrialExpireToday}
        subscriptionExpireToday={subscriptionExpireToday}
      />
    </section>
  );
};

export default AvailableMeals;
