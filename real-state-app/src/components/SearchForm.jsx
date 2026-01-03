import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Property type options
const propertyTypeOptions = [
    { value: 'any', label: 'Any Type' },
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' },
];

// Custom styles for react-select
const selectStyles = {
    control: (base, state) => ({
        ...base,
        border: state.isFocused ? '1px solid #00ADB5' : '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        minHeight: '42px',
        backgroundColor: state.isFocused ? 'white' : '#f9fafb',
        boxShadow: state.isFocused ? '0 0 0 4px rgba(0, 173, 181, 0.1)' : 'none',
        '&:hover': {
            borderColor: state.isFocused ? '#00ADB5' : '#d1d5db',
        },
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? '#00ADB5'
            : state.isFocused
                ? 'rgba(0, 173, 181, 0.1)'
                : 'white',
        color: state.isSelected ? 'white' : '#374151',
        cursor: 'pointer',
        fontSize: '14px',
        '&:active': {
            backgroundColor: '#009BA3',
        },
    }),
    menu: (base) => ({
        ...base,
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
    }),
    singleValue: (base) => ({
        ...base,
        color: '#1f2937',
        fontWeight: '500',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: '#9ca3af',
        '&:hover': {
            color: '#00ADB5',
        },
    }),
};

// Search form with filters for type, price, bedrooms, date, and location
function SearchForm({ onSearch, postcodeOptions = [] }) {
    // Form state
    const [type, setType] = useState(propertyTypeOptions[0]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minBedrooms, setMinBedrooms] = useState('');
    const [maxBedrooms, setMaxBedrooms] = useState('');
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [postcode, setPostcode] = useState(null);

    // Generate postcode options
    const postcodeSelectOptions = [
        { value: '', label: 'Any Area' },
        ...postcodeOptions.map((pc) => ({ value: pc, label: pc })),
    ];

    // Handle submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({
            type: type?.value || 'any',
            minPrice: minPrice || null,
            maxPrice: maxPrice || null,
            minBedrooms: minBedrooms || null,
            maxBedrooms: maxBedrooms || null,
            dateFrom: dateFrom,
            dateTo: dateTo,
            postcode: postcode?.value || '',
        });
    };

    // Reset form
    const handleReset = () => {
        setType(propertyTypeOptions[0]);
        setMinPrice('');
        setMaxPrice('');
        setMinBedrooms('');
        setMaxBedrooms('');
        setDateFrom(null);
        setDateTo(null);
        setPostcode(null);
        onSearch({});
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <h2 className="search-form__title">
                <span role="img" aria-label="Search">🔍</span>
                Search Properties
            </h2>

            <div className="search-form__grid">
                {/* Property Type */}
                <div className="search-form__group">
                    <label className="search-form__label" htmlFor="property-type">
                        Property Type
                    </label>
                    <Select
                        inputId="property-type"
                        value={type}
                        onChange={setType}
                        options={propertyTypeOptions}
                        styles={selectStyles}
                        isSearchable={false}
                        aria-label="Property type"
                    />
                </div>

                {/* Price Range */}
                <div className="search-form__group">
                    <label className="search-form__label">Price Range</label>
                    <div className="search-form__range">
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Min £"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            min="0"
                            aria-label="Minimum price"
                        />
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Max £"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            min="0"
                            aria-label="Maximum price"
                        />
                    </div>
                </div>

                {/* Bedrooms Range */}
                <div className="search-form__group">
                    <label className="search-form__label">Bedrooms</label>
                    <div className="search-form__range">
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Min"
                            value={minBedrooms}
                            onChange={(e) => setMinBedrooms(e.target.value)}
                            min="0"
                            max="10"
                            aria-label="Minimum bedrooms"
                        />
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Max"
                            value={maxBedrooms}
                            onChange={(e) => setMaxBedrooms(e.target.value)}
                            min="0"
                            max="10"
                            aria-label="Maximum bedrooms"
                        />
                    </div>
                </div>

                {/* Date Range */}
                <div className="search-form__group">
                    <label className="search-form__label">Date Added</label>
                    <div className="search-form__range">
                        <DatePicker
                            selected={dateFrom}
                            onChange={setDateFrom}
                            placeholderText="From"
                            dateFormat="dd/MM/yyyy"
                            maxDate={dateTo || new Date()}
                            isClearable
                            aria-label="Date from"
                        />
                        <DatePicker
                            selected={dateTo}
                            onChange={setDateTo}
                            placeholderText="To"
                            dateFormat="dd/MM/yyyy"
                            minDate={dateFrom}
                            maxDate={new Date()}
                            isClearable
                            aria-label="Date to"
                        />
                    </div>
                </div>

                {/* Postcode Area */}
                <div className="search-form__group">
                    <label className="search-form__label" htmlFor="postcode">
                        Postcode Area
                    </label>
                    <Select
                        inputId="postcode"
                        value={postcode}
                        onChange={setPostcode}
                        options={postcodeSelectOptions}
                        styles={selectStyles}
                        isClearable
                        placeholder="e.g. BR1, NW1"
                        aria-label="Postcode area"
                    />
                </div>
            </div>

            <div className="search-form__actions">
                <button type="button" className="btn btn--secondary" onClick={handleReset}>
                    Reset
                </button>
                <button type="submit" className="btn btn--primary">
                    <span role="img" aria-label="Search">🔍</span>
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchForm;
