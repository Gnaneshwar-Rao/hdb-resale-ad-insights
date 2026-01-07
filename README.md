# HDB AdTech Intelligence: Serverless Lakehouse for Propensity Targeting

An end-to-end data engineering project that builds a **Serverless Medallion Architecture** on Google Cloud Platform (GCP). The system automates the ingestion of Singapore HDB (Housing Development Board) resale data to identify high-propensity renovation leads for digital advertising campaigns.

## 🏛️ Architecture Overview
The project follows a **Lakehouse** pattern, separating storage (GCS) from compute (BigQuery) using **BigLake** external tables.

1.  **Ingestion (Bronze):** Cloud Scheduler triggers a Cloud Run service (Python/FastAvro) to fetch HDB API data and land it as Avro files in GCS.
2.  **Schema & Storage (Silver):** A BigQuery External Table (`silver_resale_raw`) provides a SQL interface to the GCS files without moving data.
3.  **Intelligence (Gold):** A BigQuery View (`v_renovation_intent_audience`) cleans data types and applies business logic to score "Renovation Propensity" based on building age.
4.  **Activation (Dashboard):** A Looker Studio dashboard visualizes "High Propensity" hotspots using geospatial heatmaps.

[Live HDB Resale Data for High Ad Propensity](https://lookerstudio.google.com/reporting/399d7ad2-0032-496f-b92d-e28e7bd19dc7)

---

## 🛠️ Tech Stack
* **Language:** Python 3.x
* **Infrastructure:** GCP (Cloud Run, Cloud Scheduler, Cloud Storage)
* **Data Warehouse:** BigQuery (BigLake External Tables & Views)
* **Data Format:** Apache Avro (Binary, schema-aware)
* **Visualization:** Looker Studio (Geospatial Address Mapping)

---

## 🚀 The Data Pipeline

### 1. The Gold Layer (Business Logic)
The core of the "AdTech" value lies in this view, which transforms raw housing data into actionable audience segments.

```sql
CREATE OR REPLACE VIEW `adtech-simulator.hdb_ads_data.v_renovation_intent_audience` AS
SELECT 
  CONCAT(block, ' ', street_name, ', Singapore') as full_address,
  town,
  SAFE_CAST(resale_price AS FLOAT64) as price_numeric,
  PARSE_DATE('%Y-%m', month) as activity_date,
  -- AdTech Propensity Logic
  (EXTRACT(YEAR FROM CURRENT_DATE()) - SAFE_CAST(lease_commence_date AS INT64)) as building_age,
  CASE 
    WHEN (EXTRACT(YEAR FROM CURRENT_DATE()) - SAFE_CAST(lease_commence_date AS INT64)) > 25 
    THEN 'High Propensity: Major Reno'
    ELSE 'Standard'
  END as segment_tag
FROM `adtech-simulator.hdb_ads_data.silver_resale_raw`;
```

### 2. Dashboard Insights
The Looker Studio dashboard serves as a Campaign Planning Tool for marketing teams to:
* **Optimize Ad Spend:** Target high-propensity zones (estates > 25 years old) to increase ROAS (Return on Ad Spend).
* **Geospatial Targeting:** Use the full_address mapping to set up hyper-local "geofencing" around specific HDB blocks.
* **Price Correlation:** Analyze if higher resale prices correlate with the need for premium interior design services.

## 📈 Key Learnings & Engineering Decisions
* **Schema Evolution:** Used Avro instead of JSON to ensure the schema is embedded in the data, preventing pipeline breakage when API fields change.
* **Cost Optimization:** Leveraged External Tables to keep storage costs at GCS rates ($0.02/GB) while utilizing BigQuery's high-speed compute.
* **Geospatial Resolution:** Solved Looker Studio geocoding ambiguity by concatenating block and street data into a standardized Singapore address format.

## 🔧 Setup Instructions
1.  Deploy the `main.py` Cloud Run service.
2.  Configure Cloud Scheduler to trigger the service URL.
3.  Run the DDL scripts in `bigquery/` to create the Silver Table and Gold View.
4.  Connect the Gold View to Looker Studio and set full_address to Geo > Address.