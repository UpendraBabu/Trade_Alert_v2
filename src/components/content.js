import { Box, Collapse, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import ShimmerLoder from './shimmer_loder';
import moment from 'moment';



const headCells = [
  {
    id: '_id',
    align: 'left',
    disablePadding: true,
    label: 'Id'
  },
  {
    id: 'data',
    align: 'left',
    disablePadding: true,
    label: 'Data'
  },
  // {
  //   id: 'createdAt',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'Json'
  // },
  {
    id: 'updatedAt',
    align: 'right',
    disablePadding: false,
    label: 'UpdatedAt'
  },
];
const Content = ({ data, onChangePagination, isLoading }) => {
  const [page, setPage] = useState(0);
 
  const tradeData = data.data;
  const totalCount = data.totalCount;

  const handleChangePage = (event, value) => {
    setPage(value - 1);
    let lowerLimit = value === 1 ? 0 : (value - 1) * 100;
    let upperLimit = lowerLimit + 100;
    // console.log("upper limit", upperLimit, "lower limit", lowerLimit, value - 1);
    // let lowerLimit = value*
    onChangePagination(lowerLimit, upperLimit)
    // For use case
    //   window.scrollTo({
    //     top: 0,
    //     behavior: "auto",
    //   });
    // };

    if (typeof window !== 'undefined') {
      const scrollToTop = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 0) {
          window.scrollBy(0, -30); // Adjust the scroll speed by changing the second parameter
          requestAnimationFrame(scrollToTop);
        }
      };

      scrollToTop();
    }
  };

  // const dataPagenation = rowsPerPage > 0
  //   ? tradeData && tradeData.slice(page, ((page == 0 ? 1 : page)* 10) * tradeData.length)
  //   : tradeData;

  // console.log("log at page", "count", Math.ceil(totalCount/100),);


  return (
    <>
      {
        isLoading ?
          <ShimmerLoder />
          :
          <TableContainer variant="tablecontainer"
          >
            <Table
              aria-labelledby="tableTitle"
              sx={{
                '& .MuiTableCell-root:nth-of-type(2)': {
                  pl: 6
                },
                '& .MuiTableCell-root:nth-of-type(3)': {
                  pl: 6
                },
                '& .MuiTableCell-root:nth-of-type(4)': {
                  pl: 6
                },
                '& .MuiTableCell-root:nth-of-type(5)': {
                  pl: 6
                },
              }}
            >
              <TableHead>
                <TableRow>
                  {headCells.map((headCell, index) => (
                    <TableCell
                      sx={{ border: 'none' }}
                      key={index}
                      align={headCell.align}
                    >
                      <Typography variant='h6' sx={{ color: '#000', fontWeight: 600 }}  >
                        {headCell.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {tradeData === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} align="center" sx={{ border: 'none', }} >
                      <Typography>No Record found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (tradeData?.map((row, index) => {
                  // const isItemSelected = isSelected(row.Name);
                  let updateAt = moment(parseInt(row.updatedAt)).utc().format('ddd, DD MMM YYYY HH:mm:ss');

                  // row.data.map((val) => {
                  //   console.log("data:101", val);

                  // },);
                  return (
                    <TableRow
                      // hover 
                      tabIndex={-1}
                      style={{ backgroundColor: index % 2 === 0 ? '#e4dada57' : '#caddd8', width: "50px" }}
                      key={index}

                    >
                      <TableCell component="th" scope="row" align="left" pl={0}>
                        {row.id}
                      </TableCell>

                      <TableCell onClick={() => {
                        // setIsShow(!isShow);
                      }} align="left" sx={{
                        minWidth: "100px", // Minimum width
                        maxWidth: "200px", // Maximum width
                        overflow: "auto",
                        textOverflow: "ellipsis",
                        whiteSpace: "wrap", // Allow text to wrap
                        // cursor: 'pointer',
                        '&::-webkit-scrollbar': {
                          display: 'none',
                        },
                        '&::-moz-scrollbar': {
                          display: 'none'
                        }
                      }}>
                        {/* tradeData */}
                        <Collapse in={true} style={{ display: "block", lineHeight: 2 }}>
                          {row.data}
                        </Collapse>
                      </TableCell>

                      <TableCell align="right">
                        {updateAt}
                      </TableCell>
                    </TableRow>
                  );
                }))}


              </TableBody>
            </Table>
          </TableContainer>
      }

      <Box pt={4} pb={8} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(totalCount / 100)}
          page={page + 1}
          onChange={handleChangePage}
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-page.Mui-selected': {
              backgroundColor: '#000',
              color: 'white',
              '&:hover': {
                backgroundColor: '#000'
              }
            }
          }}
        />
      </Box>
    </>
  )
}

export default Content;
