import { Box } from "@mui/material";
import "./CandyLoader.css";

function CandyLoader() {
  return (
    <Box className="loader-container">
      <div className="candy-loader">
        <div className="candy candy1"></div>
        <div className="candy candy2"></div>
        <div className="candy candy3"></div>
      </div>
    </Box>
  );
}

export default CandyLoader;