# Lagos LGA Ranking Dashboard

An interactive web application that displays and ranks Lagos State Local Governments (LGAs) based on three weighted indicators.

## Features

- **Three Weight Sliders**: Adjust Economic & Financial, Impact, and Infrastructure & Cost weights (0-100)
- **Real-time Ranking**: Rankings update automatically when weights change
- **Color-coded Ratings**: Green (High), Yellow (Medium), Red (Low)
- **Responsive Design**: Works on mobile, tablet, and desktop

## Technologies Used

### Backend

- Python 3.x
- Django 4.2.7
- Django REST Framework 3.14.0
- django-cors-headers 4.3.0

### Frontend

- React 18 with TypeScript
- Axios for API calls
- CSS3 with CSS Variables

## Scoring Formula

```
FinalScore = (EconomicScore × EconomicWeight + ImpactScore × ImpactWeight + InfrastructureScore × InfrastructureWeight) ÷ TotalWeight
```

Default weights:

- Economic: 40
- Impact: 0
- Infrastructure: 65

## Setup Instructions

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

Backend runs on http://localhost:8000

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3000

## API Endpoints

### GET /api/lga-scores/

Returns all LGA scores.

### POST /api/calculate-rankings/

Calculate weighted rankings.

Request body:

```json
{
  "economic_weight": 40,
  "impact_weight": 0,
  "infrastructure_weight": 65
}
```

## Project Structure

```
vista-project/
├── backend/
│   ├── api/
│   │   ├── data.py        # LGA dataset
│   │   ├── views.py       # API views
│   │   └── urls.py        # API routes
│   ├── config/
│   │   ├── settings.py    # Django settings
│   │   └── urls.py        # Root URLs
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.tsx        # Main component
│   │   ├── App.css        # Styles
│   │   └── App.test.tsx   # Tests
│   └── package.json
└── README.md
```

## Running Tests

### Frontend Tests

```bash
cd frontend
npm test
```

## Deployment

For production deployment:

1. Backend: Deploy to Heroku, Railway, or similar
2. Frontend: Deploy to Vercel, Netlify, or similar
3. Update `REACT_APP_API_URL` environment variable to point to production API

## License

MIT
