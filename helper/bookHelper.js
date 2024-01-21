// helpers/bookHelpers.js

export const validateReleaseYear = (year) => {
  return year >= 1980 && year <= 2021;
};

export const determineThickness = (totalPage) => {
  if (totalPage <= 100) return "tipis";
  if (totalPage <= 200) return "sedang";
  return "tebal";
};

export const filterBook = (query) => {
  const conditions = {
    where: {},
    orderBy: {},
  };

  if (query.title) {
    conditions.where.title = {
      contains: query.title,
    };
  }

  if (query.minYear) {
    conditions.where.release_year = {
      ...conditions.where.release_year,
      gte: parseInt(query.minYear),
    };
  }

  if (query.maxYear) {
    conditions.where.release_year = {
      ...conditions.where.release_year,
      lte: parseInt(query.maxYear),
    };
  }

  if (query.minPage) {
    conditions.where.total_page = {
      ...conditions.where.total_page,
      gte: parseInt(query.minPage),
    };
  }

  if (query.maxPage) {
    conditions.where.total_page = {
      ...conditions.where.total_page,
      lte: parseInt(query.maxPage),
    };
  }
  // Tambahkan logika untuk filter kategori
  if (query.category) {
    conditions.where.category = {
      equals: query.category,
    };
  }

  // Tambahkan logika untuk sortByTitle jika diperlukan

  return conditions;
};
