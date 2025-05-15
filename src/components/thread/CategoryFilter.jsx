import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFilterCategoryActionCreator } from '../../states/actions/threadActions';

function CategoryFilter({ categories, activeCategory }) {
  const dispatch = useDispatch();

  const handleCategoryChange = (category) => {
    dispatch(setFilterCategoryActionCreator(category));
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by category</h3>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={`px-3 py-1 rounded-full text-sm ${
            activeCategory === ''
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => handleCategoryChange('')}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`px-3 py-1 rounded-full text-sm ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            #{category}
          </button>
        ))}
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
};

export default CategoryFilter;
