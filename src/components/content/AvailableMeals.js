import { useEffect, useState, useRef } from "react";
import MealItem from "./MealItem";
import classes from "./AvailableMeals.module.css";
import { useCartContext } from "../context/cart-context";
import { useParams } from "react-router-dom";
import theGoldenSpoonMenu from "../../data/theGoldenSpoon.json";
import configData from "../../data/config.json";
import SubscriptionDialog from "../dialogs/SubscriptionDialog";
import "./categories.css";

const parseDate = (dateStr) => {
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
        todayDateOnly >= expiryDate && expiryDate > trialEndDate;
      const isTrialEndTodayOrPast =
        todayDateOnly >= trialEndDate &&
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
      // setMealCate(cate)
    } else {
      setMeals(allMenuItems.filter((item) => item.category === cate));
      // setMealCate(cate)
    }
    setSelectedCategory(cate);
    // setMealCate(cate)
  };

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <span className="">
      <section className={classes.meals} style={{ paddingBottom: "10vh" }}>
        <br />
        <div
          className="category-container mb-2"
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
          <ul>{mealsList}</ul>
        </div>
      </section>

      <SubscriptionDialog
        open={dialogOpen}
        freeTrialExpireToday={freeTrialExpireToday}
        subscriptionExpireToday={subscriptionExpireToday}
      />
    </span>
  );
};

export default AvailableMeals;
