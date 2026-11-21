package com.vcube.inventory.repository;

import com.vcube.inventory.entity.StockTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface StockTransactionRepository extends JpaRepository<StockTransaction, Long> {
    List<StockTransaction> findByProductId(Long productId);
    List<StockTransaction> findByType(StockTransaction.TransactionType type);

    List<StockTransaction> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT st FROM StockTransaction st ORDER BY st.createdAt DESC")
    List<StockTransaction> findRecentTransactions(org.springframework.data.domain.Pageable pageable);
}

