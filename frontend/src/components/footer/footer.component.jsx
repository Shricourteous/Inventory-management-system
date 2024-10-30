import React from "react";

const Footer = () => {
  return (
    <>
      <footer class="bg-green-600 text-white py-10">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 class="text-lg font-bold mb-4">Company Name</h2>
              <p class="mb-2">1234 Street Name, City, Country</p>
              <p class="mb-2">Phone: (123) 456-7890</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@company.com"
                  class="text-blue-800 hover:underline"
                >
                  info@company.com
                </a>
              </p>
            </div>

            <div>
              <h2 class="text-lg font-bold mb-4">Quick Links</h2>
              <ul>
                <li>
                  <a href="#" class="hover:underline">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    Sales
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    Reports
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    Settings
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 class="text-lg font-bold mb-4">Contact Us</h2>
              <p class="mb-2">Have questions? Reach out to us!</p>
            </div>
          </div>
        </div>
        <div class="border-t h-10 border-gray-700 mt-8 pt-4">
          <div class="container mx-auto text-center">
            <p>&copy; 2024 Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
