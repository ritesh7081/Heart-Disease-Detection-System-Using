FROM python:3.10-slim

WORKDIR /app

# Copy project
COPY . /app

# Install pip and dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Default port for Spaces is 7860; many PaaS provide $PORT env variable.
ENV PORT=7860
EXPOSE 7860

# Run with gunicorn on port 7860
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "app:app", "--workers", "2", "--threads", "4"]
