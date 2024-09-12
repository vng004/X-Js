import { fetchDataCity, getDistrictsByProvinceID, getWardsByDistrictID } from "../Utils/fecthApi.js";

export const setupModalEvents = () => {
    const buyBtn = document.getElementById("buy-btn");
    if (buyBtn) {
        buyBtn.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("buy-modal").style.display = "block";
        });
    }

    const xBtn = document.getElementById("x-btn");
    if (xBtn) {
        xBtn.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("buy-modal").style.display = "none";
        });
    }
};




export const setupFormEvents = () => {
    fetchDataCity();

    document.getElementById('city').addEventListener('change', (event) => {
        const provinceCode = event.target.value;
        getDistrictsByProvinceID(provinceCode);
    });

    document.getElementById('district').addEventListener('change', (event) => {
        const districtCode = event.target.value;
        getWardsByDistrictID(districtCode);
    });
};
