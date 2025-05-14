#!/bin/bash

# Function to check if a process is running
is_process_running() {
  ps -p $1 > /dev/null
  return $?
}

# Function to handle script termination
cleanup() {
  echo "Shutting down servers..."
  
  # Kill backend process if it's running
  if is_process_running $BACKEND_PID; then
    kill $BACKEND_PID
  fi
  
  # Kill frontend process if it's running
  if is_process_running $FRONTEND_PID; then
    kill $FRONTEND_PID
  fi
  
  echo "Servers shut down successfully."
  exit 0
}

# Register the cleanup function for script termination
trap cleanup SIGINT SIGTERM

# Start the backend server
echo "Starting backend server..."
cd backend
source venv/bin/activate || python -m venv venv && source venv/bin/activate
pip install -r requirements.txt > /dev/null
python app.py &
BACKEND_PID=$!
cd ..

# Wait for the backend to start
echo "Waiting for backend server to start..."
sleep 3

# Check if the backend is running
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "✅ Backend server is running at http://localhost:5000"
else
    echo "❌ Failed to start backend server"
    cleanup
    exit 1
fi

# Start the frontend development server
echo "Starting frontend development server..."
npm install > /dev/null
npm run dev &
FRONTEND_PID=$!

# Wait for the frontend to start
echo "Waiting for frontend server to start..."
sleep 5

# Check if the frontend is running
FRONTEND_PORT=$(lsof -i -P | grep LISTEN | grep node | head -n 1 | awk '{print $9}' | cut -d':' -f2)
if [ -z "$FRONTEND_PORT" ]; then
    FRONTEND_PORT=5173  # Default Vite port
fi

if curl -s http://localhost:$FRONTEND_PORT > /dev/null; then
    echo "✅ Frontend server is running at http://localhost:$FRONTEND_PORT"
else
    echo "❌ Failed to start frontend server"
    cleanup
    exit 1
fi

# Open the application in the default browser
echo "Opening application in browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open http://localhost:$FRONTEND_PORT
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open http://localhost:$FRONTEND_PORT
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    start http://localhost:$FRONTEND_PORT
else
    echo "Please open http://localhost:$FRONTEND_PORT in your browser"
fi

echo "🚀 Both servers are running!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:$FRONTEND_PORT"
echo "Press Ctrl+C to stop both servers."

# Wait for user to press Ctrl+C
wait