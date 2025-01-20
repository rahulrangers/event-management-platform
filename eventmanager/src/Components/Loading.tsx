import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading=()=>{
    return(
      <div
    >
    <div className="w-screen h-screen flex justify-center  items-center ">
      <Box sx={{ display: 'flex' }} >
        <CircularProgress />
      </Box>
      </div>
      </div>
    )
}
export default Loading;