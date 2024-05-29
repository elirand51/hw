import axios from "axios";

const fetchCitiesData = async () => {
    try {
        const {
            data: { result },
            status,
        } = await axios.get(
            "https://data.gov.il/api/3/action/datastore_search",
            {
                params: {
                    resource_id: "8f714b6f-c35c-4b40-a0e7-547b675eee0e",
                },
            }
        );
        let cityData = [];

        if (result.records?.length && status === 200) {
            cityData = result.records?.reduce((total:any, item:any)=> {
                if (item?.city_name_en?.trim())
                    return [...total, item.city_name_en.trim()];
                return total;
            }, []);
        }

        return cityData;
    } catch (error) {
        return [];
    }
};

class cities {
    _cities_list?: string[];

    async loadCities(){
        this._cities_list = await fetchCitiesData();
    }

    randomCities(number_of_cities: number) {
        const CITIES_LENGTH = this._cities_list?.length;
        if (!CITIES_LENGTH) return null;

        let attempts = 0;
        const indexes = new Set();
        while (indexes.size < number_of_cities){
            const rnd_index = Math.floor(Math.random() * CITIES_LENGTH);
            indexes.add(rnd_index);
            attempts++;
            if (attempts > 10) break;
        }

        if (indexes.size < number_of_cities){
            let i = 0;
            while (indexes.size < number_of_cities){
                indexes.add(i);
                i++;
            }

        }

        const cities_ = this._cities_list as string[];
        return Array.from(indexes).map((index) => cities_[index as number]);
    }

}

const CitiesList = new cities();

export {CitiesList};
