const URL_API = 'https://provinces.open-api.vn/api/';

export const fetchDataCity = async () => {
    try {
        const city = document.getElementById('city');
        const response = await fetch(URL_API + 'p');
        const data = await response.json();
        const defaultOption = '<option value="">--Chọn Tỉnh/Thành Phố--</option>';
        const options = data.map(c =>
            `<option value="${c.code}">${c.name}</option>`).join('');
        city.innerHTML = defaultOption + options;
        document.getElementById('district').disabled = true;
        document.getElementById('ward').disabled = true;
    } catch (error) {
        console.log("Lỗi khi lấy dữ liệu thành phố:", error);
    }
};

export const getDistrictsByProvinceID = async (provinceCode) => {
    if (!provinceCode) return;
    try {
        const district = document.getElementById('district');
        const response = await fetch(`${URL_API}p/${provinceCode}?depth=2`);
        const data = await response.json();
        const defaultOption = '<option value="">--Chọn Huyện/Quận--</option>';
        const options = data.districts.map(d =>
            `<option value="${d.code}">${d.name}</option>`).join('');
        district.innerHTML = defaultOption + options;
        district.disabled = false;
        document.getElementById('ward').disabled = true;
    } catch (error) {
        console.log("Lỗi khi lấy dữ liệu huyện/quận:", error);
    }
};

export const getWardsByDistrictID = async (districtCode) => {
    if (!districtCode) return;
    try {
        const ward = document.getElementById('ward');
        const response = await fetch(`${URL_API}d/${districtCode}?depth=2`);
        const data = await response.json();
        const defaultOption = '<option value="">--Chọn Xã/Phường--</option>';
        const options = data.wards.map(w =>
            `<option value="${w.code}">${w.name}</option>`).join('');
        ward.innerHTML = defaultOption + options;
        ward.disabled = false;
    } catch (error) {
        console.log("Lỗi khi lấy dữ liệu xã/phường:", error);
    }
};