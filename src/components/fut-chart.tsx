

import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import BuyLongButton from "./buy-long-button";
import obim from './clob.png';

const ChartComponent: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [areaSeries] = useState<any>(null);
//   const [ setBaselineSeries] = useState<any>(null);
  const [areaSeriesData, setAreaSeriesData] = useState([
    { time: '2018-12-22', value: 27.51 },
    { time: '2018-12-23', value: 24.11 },
    { time: '2018-12-24', value: 23.02 },
    { time: '2018-12-25', value: 22.32 },
    { time: '2018-12-26', value: 23.17 },
    { time: '2018-12-27', value: 24.89 },
    { time: '2018-12-28', value: 23.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
  ]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        textColor: 'black',
        background: { color: 'transparent' }, // Make the background transparent
      },
    });

    const chartContainer = chartContainerRef.current;
    if (chartContainer) {
      chartContainer.style.background = 'linear-gradient(to bottom, #020024, #4f485e)';
      chartContainer.style.borderRadius = '10px'; // Add curved corners
      chartContainer.style.border = '2px solid #fff'; // Add a white border (change color as needed)
      chartContainer.style.overflow = 'hidden'; 
    }

    const area = chart.addAreaSeries({
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    });

    const baseline = chart.addBaselineSeries({
      baseValue: { type: 'price', price: 25 },
      topLineColor: 'rgba(38, 166, 154, 1)',
      topFillColor1: 'rgba(38, 166, 154, 0.28)',
      topFillColor2: 'rgba(38, 166, 154, 0.05)',
      bottomLineColor: 'rgba(239, 83, 80, 1)',
      bottomFillColor1: 'rgba(239, 83, 80, 0.05)',
      bottomFillColor2: 'rgba(239, 83, 80, 0.28)',
    });

    const baselineData = [
      { time: '2018-12-22', value: 25 },
      { time: '2018-12-23', value: 25 },
      { time: '2018-12-24', value: 25 },
      { time: '2018-12-25', value: 25 },
      { time: '2018-12-26', value: 25 },
      { time: '2018-12-27', value: 25 },
      { time: '2018-12-28', value: 25 },
      { time: '2018-12-29', value: 25 },
      { time: '2018-12-30', value: 25 },
      { time: '2500-04-31', value: 25 },
    ];
    
    baseline.setData(areaSeriesData);
    chart.timeScale().fitContent();

    area.setData(baselineData);

    // setBaselineSeries(baseline);
    
    const interval = setInterval(() => {
      setAreaSeriesData((prevData) => {
        const lastDataPoint = prevData[prevData.length - 1];
        const nextDate = getNextDate(lastDataPoint.time);
        const newValue = lastDataPoint.value + (Math.random() - 0.5)*0.1;
        const newData = { time: nextDate, value: parseFloat(newValue.toFixed(2)) };
        const updatedData = [...prevData, newData];

        if (areaSeries) {
          areaSeries.setData(updatedData);
        }

        return updatedData;
      });
    }, 400);

    return () => {
      clearInterval(interval);
      chart.remove();
    };
  }, [areaSeriesData]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getNextDate = (lastDateString: string): string => {
    const lastDate = new Date(lastDateString);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + 1);
    return formatDate(nextDate);
  };

  const addAreaDataLong = () => {
    setAreaSeriesData((prevData) => {
      const lastDataPoint = prevData[prevData.length - 1];
      const nextDate = getNextDate(lastDataPoint.time);
      const newData = { time: nextDate, value: lastDataPoint.value + Math.random() * 5 };
      const updatedData = [...prevData, newData];

      if (areaSeries) {
        areaSeries.setData(updatedData);
      }

      return updatedData;
    });
  };

  const addAreaDataShort = () => {
    setAreaSeriesData((prevData) => {
      const lastDataPoint = prevData[prevData.length - 1];
      const nextDate = getNextDate(lastDataPoint.time);
      const newData = { time: nextDate, value: lastDataPoint.value - Math.random() * 2 };
      const updatedData = [...prevData, newData];

      if (areaSeries) {
        areaSeries.setData(updatedData);
      }

      return updatedData;
    });
  };

  const addAreaDataNoise = () => {
    setAreaSeriesData((prevData) => {
      const lastDataPoint = prevData[prevData.length - 1];
      const nextDate = getNextDate(lastDataPoint.time);
      const newData = { time: nextDate, value: lastDataPoint.value + Math.random() * 10 - 5 };
      const updatedData = [...prevData, newData];

      if (areaSeries) {
        areaSeries.setData(updatedData);
      }

      return updatedData;
    });
  };

  const addAreaDataBuy = () => {
    setAreaSeriesData((prevData) => {
      const lastDataPoint = prevData[prevData.length - 1];
      const nextDate = getNextDate(lastDataPoint.time);
      const newData = { time: nextDate, value: lastDataPoint.value + Math.random() * 2 };
      const updatedData = [...prevData, newData];

      if (areaSeries) {
        areaSeries.setData(updatedData);
      }

      return updatedData;
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Left section: Chart */}
      <div style={{ marginRight: '10px' }}> {/* Chart container */}
        <div ref={chartContainerRef} style={{ width: '700px', height: '500px' }} />
      </div>
  
      {/* Middle section: Empty space (for an image) */}
      <div style={{ marginRight: '20px', width: '300px', 
        height: '492px', 
        border: '2px solid #ccc',  // Add border
                borderRadius: '10px',       // Optional: rounded corners
                padding: '3px',            // Adjust padding for the buttons container
                backgroundColor: '#0e1a1e',
        }}> {/* Placeholder for image */}
        {/* You can add an <img> tag here later */}
        <img src={obim} alt="Chart" style={styles.image} />
      </div>
  
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {/* Buttons container */}
            <div 
            style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: '10px',
                border: '2px solid #ccc',  // Add border
                borderRadius: '10px',       // Optional: rounded corners
                padding: '20px',            // Adjust padding for the buttons container
                backgroundColor: '#0e1a1e',  // Optional: background color inside the border
                width: '300px'
            }}
            > 
            <button onClick={addAreaDataBuy}></button>
            <BuyLongButton addAreaDataLong={addAreaDataLong} />
            <button onClick={addAreaDataShort}>Sell / Short</button>
            <button onClick={addAreaDataNoise}></button>
            </div>
            <div 
            style={{
                border: '2px solid #ccc',  // Add border
                borderRadius: '10px',       // Optional: rounded corners
                padding: '5px',            // Padding for the new content
                height: '45px',            // Set height for the new section
                backgroundColor: '#0e1a1e',  // Optional: background color
                textAlign: "left"
            }}
            >
            {/* Placeholder content for the new section */}
            
            Select Leverage: 
            <button>100x</button>
            <button>1000x</button>
            </div>
            {/* New div underneath the buttons container */}
            <div 
            style={{
                border: '2px solid #ccc',  // Add border
                borderRadius: '10px',       // Optional: rounded corners
                padding: '5px',            // Padding for the new content
                height: '320px',            // Set height for the new section
                backgroundColor: '#0e1a1e',  // Optional: background color
                textAlign: "left"
            }}
            >
            <p>sUSDe APY Perpetual Future</p>
            <p>EXPIRY:  Perpetual </p>
            <p>CONTRACT SPEC: Each contract is valued price * leverage. Funding rate is paid out every 24 hours.</p>
            <p>SETTLEMENT PROCEDURE: Pegged to value of sUSDe APY Index. Settles to the 20 day rolling average sUSDe APY. This is a cash settled perpetual future.</p>
           
            </div>
        </div>
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center all elements horizontally
      width: '100%', // Ensure full width
    },
    buttonContainer: {
      marginTop: '20px', // Space above buttons
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%', // Take full width for buttons
    },
    image: {
        width: '250px', // Set the image width
        height: '490px', // Maintain aspect ratio
        borderRadius: '0px', // Optional rounded corners for the image
        marginRight: '0px', // Space between the image and text
      },
  };



  

export default ChartComponent;
