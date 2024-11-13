import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import trade_alert from '../assets/trade_alert.png';
import { postdata_endpoint_URL, postDataGettrade } from '../api/testing_api';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Content from './content';
import ShimmerLoder from './shimmer_loder';

const Trade_Alert = () => {
  //Date picker
  let start, end;

  const [startDateValue, setStartDateValue] = React.useState(dayjs(start));
  const [endDateValue, setEndDateValue] = React.useState(dayjs(end));

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSeconderLoder, setIsSeconderyLoder] = useState(false);

  // const dateString = startDateValue;
  // const epochTime = new Date(dateString).getTime();

  const handleConfirm = () => {
    setIsLoading(true);
    let postData = {
      startingDate: new Date(startDateValue).getTime(),
      endingDate: new Date(endDateValue).getTime(),
      lowerLimit: 1,
      upperLimit: 100
    };

    postDataGettrade(postdata_endpoint_URL(), postData).then(function (res) {
      if (res.error) {
        alert(res.message);

      } else {

        setData(res);
        setIsSeconderyLoder(false);
      }
    }).catch((error) => {
      console.log("error on submit:", error);
      alert(` ${error}`);
      setIsLoading(false);
    },);

    setIsLoading(false);
  };

  const onGetTradeAlert = () => {
    setIsLoading(true);

    let postData = {
      // startingDate: new Date(startDateValue).getTime(),
      // endingDate: new Date(endDateValue).getTime(),
      lowerLimit: 1,
      upperLimit: 100,
    };

    postDataGettrade(postdata_endpoint_URL(), postData).then(function (res) {
      if (res.error === true) {
        alert(res.message);

      } else {

        setData(res);
        setIsLoading(false);
      }
    }).catch((error) => {
      console.log("errors", error);
      alert(`${error}`);
      setIsLoading(false);
    },);
  };

  const onChangePagination = (startVal, endVal) => {
    setIsSeconderyLoder(true);

    let postData = {
      // startingDate: new Date(startDateValue).getTime(),
      // endingDate: new Date(endDateValue).getTime(),
      lowerLimit: startVal,
      upperLimit: endVal,
    };

    postDataGettrade(postdata_endpoint_URL(), postData).then(function (res) {
      if (res.error) {
        alert(res.message);

      } else {

        setData(res);
        setIsSeconderyLoder(false);
      }
    }).catch((error) => {
      console.log("errors", error);
      alert(`${error}`);
      setIsSeconderyLoder(false);
    },);

  };

  useEffect(() => {
    onGetTradeAlert();
  }, []);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: "#FFFFFF7E",
        }}
      >

        <Box pt={4}>
          <img
            src={trade_alert}
            alt="Logo"
            style={{ width: '80px', height: '80px' }}
          />
        </Box>

        <Stack direction='row' alignItems="center" spacing={2} style={{ flexDirection: 'row', justifyContent: "space-between", }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Stack components={['DatePicker', 'DatePicker']} pt={1}
              spacing={2.5}
              direction={{ xs: 'column', md: 'row', sm: 'row', lg: 'row' }}
            >

              <Stack spacing={1}>
                <Typography variant='labelsmall'>
                  From Date
                </Typography>
                <DatePicker
                  value={startDateValue}
                  onChange={(newValue) => setStartDateValue(newValue)}
                  // shouldDisableYear={shouldDisableYear}
                  maxDate={dayjs(end)}
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/YYYY"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText="DD/MM/YYYY"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                  slotProps={{
                    textField: {
                      helperText: 'MM/DD/YYYY',
                    },
                  }}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant='labelsmall'>
                  To Date
                </Typography>
                <DatePicker
                  value={endDateValue}
                  onChange={(newValue) => setEndDateValue(newValue)}
                  maxDate={dayjs(end)}
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/YYYY"
                  renderInput={(params) => <TextField {...params} />}
                  slotProps={{
                    textField: {
                      helperText: 'MM/DD/YYYY',
                    },
                  }}
                />
              </Stack>

              <Stack style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Button variant='container1' onClick={handleConfirm}
                  sx={{
                    backgroundColor: '#ffd24d',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    '&:hover': {
                      backgroundColor: '#ffd24d',
                    },
                  }}
                >
                  Submit
                </Button>
              </Stack>

            </Stack>
          </LocalizationProvider>

          <Stack style={{ flexDirection: 'column', justifyContent: 'center', marginTop: "7px" }}>
            <Button variant='container1' onClick={onGetTradeAlert}
              sx={{
                backgroundColor: '#ffd24d',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '16px',
                // border: '3px solid #000000FF',
                '&:hover': {
                  backgroundColor: '#ffd24d',
                },
              }}
            >
              {<AutorenewIcon style={{ marginRight: 5 }} />}  Refresh
            </Button>
          </Stack>

        </Stack>
        {
          isLoading || data === null || data === undefined ?
            <Stack style={{ marginTop: "48px" }}>
              <ShimmerLoder />
            </Stack>
            :
            <Stack pt={4}>
              <Content data={data} onChangePagination={onChangePagination} isLoading={isSeconderLoder} />
            </Stack>
        }

      </Container >
    </>
  )
}

export default Trade_Alert;