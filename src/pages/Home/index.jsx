import { useEffect, useState, createRef } from "react";
import styles from "./home.module.css";
import { Button, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import RaceBarChart from "../../components/BarChart";
import useGetCovidCountries from "./api/useGetCovidCountries";
import moment from "moment";

const { RangePicker } = DatePicker;

const Home = () => {
  const [startDate, setStartDate] = useState(moment("2020-06-01"));
  const [endDate, setEndDate] = useState(moment("2020-06-30"));
  const [covidData, fetchCovidCountries] = useGetCovidCountries();

  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = async ({ dateRange }) => {
    const [start, end] = dateRange;
    setStartDate(moment(moment(start.$d).format("YYYY-MM-DD")));
    setEndDate(moment(moment(end.$d).format("YYYY-MM-DD")));
  };

  const formRefSubmit = createRef();

  useEffect(() => {
    const time = setInterval(() => {
      if (startDate <= endDate) {
        fetchCovidCountries(moment(startDate).format("YYYY-MM-DD"));
        setStartDate((prev) => moment(prev).add(1, "days"));
      }
    }, 1000);

    return () => clearInterval(time);
  }, [startDate, endDate, covidData, fetchCovidCountries]);

  const disabledDate = (current) => {
    // Define the range of disabled dates
    const startDate = moment("2020-02-06", "YYYY-MM-DD");
    const endDate = moment("2023-09-13", "YYYY-MM-DD");

    // Check if the current date is before the start date or after the end date
    return current.isBefore(startDate) || current.isAfter(endDate);
  };

  return (
    <div className={styles.container}>
      <h1>Covid Global Cases by SGN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.search_box}>
          <Controller
            name="dateRange"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <RangePicker
                {...field}
                disabledDate={disabledDate}
                format="DD/MM/YYYY"
                placeholder={["Start Date", "End Date"]}
              />
            )}
          />
          <Button
            onClick={() => formRefSubmit.current.click()}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </div>
        {errors.dateRange && (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "red" }}>Please enter a date.</p>
          </div>
        )}
        <button ref={formRefSubmit} type="submit" hidden />
      </form>
      <div style={{ margin: "10px 0" }}></div>
      {startDate.format("DD/MM/YYYY")}
      <RaceBarChart data={covidData.data || []} />
    </div>
  );
};

export default Home;
