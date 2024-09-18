import cn from "classnames";
import { FC } from "react";

import { usePagination, DOTS } from "@/shared/hooks";
import shevronLeftIcon from '../../shared/assets/icons/shevron-left.svg';
import shevronRightIcon from '../../shared/assets/icons/shevron-right.svg';

import styles from './Pagination.module.scss';

interface Props {
  onPageChange: (page: number) => void,
  totalCount: number,
  siblingCount?: number,
  currentPage: number,
  pageSize: number,
  className: string
};

const Pagination: FC<Props> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;
  
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });
  
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      className={cn(styles['pagination-container'], { [className]: className })}
    >
        {/* Стрелка влево */}
      <li
        className={cn(styles['pagination-item'], {[styles['disabled']]: currentPage === 1})}
        onClick={onPrevious}
      >
        <div className={styles["arrow"]}>
          <img src={shevronLeftIcon} alt="shevronLeftIcon" />
        </div>
      </li>
      
      {paginationRange.map((pageNumber, index) => {

        // Если pageItem является DOT, рендерим троеточие
        if (pageNumber === DOTS) {
          return <li key={index} className={cn(styles['pagination-item'], styles['dots'])}>&#8230;</li>;
        }

        // Рендер номеров страниц
        return (
          <li
            className={cn(styles['pagination-item'], {[styles['selected']]: pageNumber === currentPage})}
            key={index}
            onClick={() => onPageChange(+pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}


      {/*  Стрелка вправо */}
      <li
        className={cn(styles['pagination-item'], {[styles['disabled']]: currentPage === lastPage})}
        onClick={onNext}
      >
        <div className={styles["arrow"]} >
          <img src={shevronRightIcon} alt="shevronRightIcon" />
        </div>
      </li>
    </ul>
  );
};

export default Pagination