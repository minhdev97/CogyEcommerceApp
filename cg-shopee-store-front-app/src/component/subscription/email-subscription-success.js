import React from 'react';
import LogoCogy from '../LogoCogy';
import Footer from '../product/Footer';

function EmailSubscriptionSuccess() {

  return (
      <>
          <div
              style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '50px',
                  marginTop: '150px',
              }}
          >
              <div style={{ marginBottom: '15px' }}>
                  <LogoCogy isBlue={true} widthInput={290} />
              </div>
              <div style={{ fontSize: '15px', textAlign: 'center' }}>
                  <strong>
                      <p>Thank you for subscribing!</p>
                  </strong>
                  <p>Welcome to CogyShop.</p>
                  <p>
                      We are thrilled to have you on board. Our team is committed to providing you with the best
                      shopping experience. If you have any questions or need assistance, feel free to reach out to our
                      support team. Happy shopping!
                  </p>
              </div>
          </div>
          <Footer />
      </>
  );
}

export default EmailSubscriptionSuccess;
