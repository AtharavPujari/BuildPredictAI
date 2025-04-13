import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  CircularProgress
} from '@mui/material';
import Logo from './logo';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const App = () => {
  const [form, setForm] = useState({
    siteArea: '',
    floors: '',
    workers: '',
    machines: '',
    materialQuality: '',
    weather: 'Sunny',
    manpowerDrop: '0',
    materialDrop: '0',
    materialType: 'Brick',
    siteSize: 'Medium'
  });

  const [cost, setCost] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [ppeResult, setPpeResult] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ppeLoading, setPpeLoading] = useState(false);

  // Options for dropdowns
  const weatherOptions = ['Sunny', 'Rainy', 'Windy', 'Cloudy'];
  const materialTypeOptions = ['Brick', 'Concrete', 'Steel', 'Wood'];
  const siteSizeOptions = ['Small', 'Medium', 'Large'];
  const percentageOptions = Array.from({length: 101}, (_, i) => i.toString());

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name) => (event) => {
    setForm({ ...form, [name]: event.target.value });
  };

  const handlePredict = async () => {
    setLoading(true);
    setAlert(null);
    
    try {
      const response = await fetch('http://localhost:5000/predict_from_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 'error') {
        throw new Error(result.error);
      }

      setCost(result.cost);
      setTimeline(result.timeline);
      setAlert({
        severity: 'success',
        message: 'Prediction calculated successfully!'
      });
      
    } catch (error) {
      console.error('Prediction error:', error);
      setAlert({
        severity: 'error',
        message: error.message || 'Failed to calculate prediction'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    if (!e.target.files?.length) return;
    
    setPpeLoading(true);
    setPpeResult(null);
    
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      
      const response = await fetch('http://localhost:5000/detect_ppe', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 'error') {
        throw new Error(result.error);
      }

      setPpeResult(result.detected);
      setAlert({
        severity: 'success',
        message: 'Safety scan completed successfully!'
      });
      
    } catch (error) {
      console.error('PPE detection error:', error);
      setAlert({
        severity: 'error',
        message: error.message || 'Failed to detect PPE'
      });
    } finally {
      setPpeLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ 
      py: 4,
      background: 'linear-gradient(to bottom, #f9f9f9 0%, #ffffff 100px)',
      minHeight: '100vh'
    }}>
      <Logo />

      {alert && (
        <Alert severity={alert.severity} sx={{ 
          mb: 3,
          boxShadow: 1,
          borderRadius: 2
        }}>
          {alert.message}
        </Alert>
      )}

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
        gap: 2,
        mb: 4
      }}>
        {/* Numeric Inputs */}
        <TextField
          label="Site Area (sqft)"
          name="siteArea"
          value={form.siteArea}
          onChange={handleChange}
          type="number"
          fullWidth
          variant="outlined"
          InputProps={{ inputProps: { min: 100 } }}
        />
        
        <TextField
          label="Number of Floors"
          name="floors"
          value={form.floors}
          onChange={handleChange}
          type="number"
          fullWidth
          variant="outlined"
          InputProps={{ inputProps: { min: 1 } }}
        />
        
        <TextField
          label="Number of Workers"
          name="workers"
          value={form.workers}
          onChange={handleChange}
          type="number"
          fullWidth
          variant="outlined"
          InputProps={{ inputProps: { min: 1 } }}
        />
        
        <TextField
          label="Number of Machines"
          name="machines"
          value={form.machines}
          onChange={handleChange}
          type="number"
          fullWidth
          variant="outlined"
          InputProps={{ inputProps: { min: 0 } }}
        />
        
        <TextField
          label="Material Quality (1-100)"
          name="materialQuality"
          value={form.materialQuality}
          onChange={handleChange}
          type="number"
          fullWidth
          variant="outlined"
          InputProps={{ inputProps: { min: 1, max: 100 } }}
        />

        {/* Dropdown Selects */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>Weather Condition</InputLabel>
          <Select
            value={form.weather}
            onChange={handleSelectChange('weather')}
            label="Weather Condition"
          >
            {weatherOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Manpower Drop (%)</InputLabel>
          <Select
            value={form.manpowerDrop}
            onChange={handleSelectChange('manpowerDrop')}
            label="Manpower Drop (%)"
          >
            {percentageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}%
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Material Drop (%)</InputLabel>
          <Select
            value={form.materialDrop}
            onChange={handleSelectChange('materialDrop')}
            label="Material Drop (%)"
          >
            {percentageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}%
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Material Type</InputLabel>
          <Select
            value={form.materialType}
            onChange={handleSelectChange('materialType')}
            label="Material Type"
          >
            {materialTypeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Site Size</InputLabel>
          <Select
            value={form.siteSize}
            onChange={handleSelectChange('siteSize')}
            label="Site Size"
          >
            {siteSizeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Button 
          variant="contained" 
          onClick={handlePredict}
          disabled={loading}
          sx={{ 
            px: 4, 
            py: 1.5,
            background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1565c0 30%, #0d47a1 90%)'
            }
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              Calculating...
            </>
          ) : 'Calculate Project'}
        </Button>
      </Box>

      {cost !== null && timeline !== null && (
        <Box sx={{ 
          mb: 4, 
          p: 3, 
          bgcolor: '#f5f5f5', 
          borderRadius: 2,
          boxShadow: 1
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Project Estimation Results
          </Typography>
          <Typography variant="body1">
            <Box component="span" sx={{ fontWeight: 'bold' }}>Predicted Cost:</Box> ₹{cost.toLocaleString()}
          </Typography>
          <Typography variant="body1">
            <Box component="span" sx={{ fontWeight: 'bold' }}>Estimated Timeline:</Box> {timeline} days
          </Typography>
        </Box>
      )}

      {/* Enhanced PPE Detection Section */}
      <Box sx={{ 
        mb: 4, 
        border: '1px solid #e0e0e0',
        borderRadius: 4,
        p: 3,
        background: 'linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          color: '#1976d2'
        }}>
          <VerifiedUserIcon sx={{ mr: 1, fontSize: '28px' }} />
          Safety Compliance Scanner
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          alignItems: 'center'
        }}>
          <Box sx={{ 
            border: '2px dashed #bdbdbd',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            width: { xs: '100%', md: '50%' },
            '&:hover': {
              borderColor: '#1976d2',
              background: 'rgba(25, 118, 210, 0.02)'
            }
          }}>
            <input
              type="file"
              id="ppe-upload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="ppe-upload">
              <Button 
                variant="outlined" 
                component="span"
                startIcon={<CloudUploadIcon />}
                disabled={ppeLoading}
                sx={{
                  py: 2,
                  px: 4,
                  borderWidth: '2px',
                  fontSize: '1rem',
                  '&:hover': {
                    borderWidth: '2px'
                  }
                }}
              >
                {ppeLoading ? 'Analyzing...' : 'Upload Site Photo'}
              </Button>
            </label>
            <Typography variant="body2" sx={{ mt: 2, color: '#757575' }}>
              JPG/PNG (max 5MB)
            </Typography>
          </Box>

          <Box sx={{ 
            width: { xs: '100%', md: '50%' },
            minHeight: '150px'
          }}>
            {ppeLoading ? (
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}>
                <CircularProgress />
              </Box>
            ) : ppeResult ? (
              <Box>
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  color: ppeResult.length > 0 ? '#4caf50' : '#f44336'
                }}>
                  {ppeResult.length > 0 ? (
                    <>
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      Safety Compliance Verified
                    </>
                  ) : (
                    <>
                      <WarningIcon sx={{ mr: 1 }} />
                      Safety Violation Detected
                    </>
                  )}
                </Typography>
                
                <Box sx={{ 
                  mt: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1
                }}>
                  {ppeResult.length > 0 ? (
                    ppeResult.map((item, index) => (
                      <Chip
                        key={index}
                        label={item}
                        color="success"
                        variant="outlined"
                        icon={<VerifiedUserIcon />}
                        sx={{ 
                          fontWeight: 'bold',
                          px: 1
                        }}
                      />
                    ))
                  ) : (
                    <Alert severity="error" sx={{ mt: 1 }}>
                      No PPE detected - Safety violation!
                    </Alert>
                  )}
                </Box>
              </Box>
            ) : (
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center'
              }}>
                <CameraAltIcon sx={{ 
                  fontSize: '48px',
                  color: '#bdbdbd',
                  mb: 1
                }} />
                <Typography variant="body1" sx={{ color: '#9e9e9e' }}>
                  Upload or take a site photo to scan for PPE compliance
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {ppeResult && (
          <Box sx={{ 
            mt: 3,
            p: 2,
            background: '#f5f5f5',
            borderRadius: 2
          }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              <strong>Note:</strong> This automated detection should be verified by a safety officer. 
              Last scan: {new Date().toLocaleString()}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;