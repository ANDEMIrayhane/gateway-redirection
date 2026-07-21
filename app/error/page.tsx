'use client'

export default function ErrorPage() {
  return (
    <div className="container">
      <div className="card">
        <h1>Orion Gateway</h1>
        <p className="error-message">Le service est temporairement indisponible.</p>
        <p className="sub-message">Please try again later</p>
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
          margin-bottom: 24px;
        }

        .error-message {
          font-size: 18px;
          color: #ef4444;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .sub-message {
          font-size: 14px;
          color: #999;
        }
      `}</style>
    </div>
  )
}
