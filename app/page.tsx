export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1>Orion Gateway</h1>
        <p className="description">Access layer for Orion applications</p>
        <div className="status">
          <span className="status-dot"></span>
          <span className="status-text">Connected</span>
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 48px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          text-align: center;
          max-width: 400px;
          width: 100%;
        }

        h1 {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .description {
          font-size: 16px;
          color: #666;
          margin-bottom: 32px;
        }

        .status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          background: #f0f0f0;
          border-radius: 8px;
        }

        .status-dot {
          width: 12px;
          height: 12px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .status-text {
          font-size: 14px;
          font-weight: 600;
          color: #10b981;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  )
}
