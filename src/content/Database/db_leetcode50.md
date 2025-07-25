---
title: "LeetCode SQL 50"
date: "2025-07-24"
category: "software"
subCategory: "Database"
tags: ["database", "leetcode", "sql"]
slug: "db_leetcode50"
---
###### 練習練習練習

---

### [570. Manager...](https://leetcode.com/problems/managers-with-at-least-5-direct-reports/description/?envType=study-plan-v2&envId=top-sql-50)

GROUP BY + HAVING 選出符合條件值當作 where 條件

```sql
SELECT name
FROM Employee
WHERE id IN (
    SELECT managerId
    FROM Employee
    WHERE managerId IS NOT NULL
    GROUP BY managerId
    HAVING COUNT(*) >= 5
);
```

### [1934. Confirmation Rate](https://leetcode.com/problems/confirmation-rate/description/?envType=study-plan-v2&envId=top-sql-50)

用 GROUP BY + function 做出一張暫時表單 join 到主表，再處理 IFNULL 的邏輯

```sql
SELECT s.user_id, 
       IFNULL(aa.confirmation_rate, 0) AS confirmation_rate
FROM Signups AS s
LEFT JOIN (
    SELECT
      user_id,
      ROUND(
        SUM(CASE WHEN action = 'confirmed' THEN 1 ELSE 0 END) * 1.0 /
        COUNT(*),
        2
      ) AS confirmation_rate
    FROM Confirmations
    GROUP BY user_id
) AS aa
ON s.user_id = aa.user_id;
```

### [1193. Monthly Transactions I](https://leetcode.com/problems/monthly-transactions-i/description/?envType=study-plan-v2&envId=top-sql-50)

熟悉在SELECT欄位可一起使用到的語法

```sql
SELECT 
    DATE_FORMAT(trans_date, '%Y-%m') AS month,
    country,
    COUNT(*) AS trans_count,
    SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
    SUM(amount) AS trans_total_amount,
    SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM 
    Transactions
GROUP BY 
    DATE_FORMAT(trans_date, '%Y-%m'),
    country;
```

### [1174. Immediate Food Delivery II](https://leetcode.com/problems/immediate-food-delivery-ii/?envType=study-plan-v2&envId=top-sql-50)

先用 GROUPBY + MIN(DATE) 找到顧客的首筆訂單，但因為是聚合函數，無法直接帶出該筆訂單的 delivery_id ，再用 Duplicate ID key 找出該對應的原始表欄位。

```sql
SELECT
  ROUND(
    SUM(order_date = customer_pref_delivery_date) * 100.0 / COUNT(*),
    2
  ) AS immediate_percentage
FROM Delivery
WHERE (customer_id, order_date) IN (
  SELECT customer_id, MIN(order_date)
  FROM Delivery
  GROUP BY customer_id
);
```

### [1978. Employees Whose Manager Left the Company](https://leetcode.com/problems/employees-whose-manager-left-the-company/?envType=study-plan-v2&envId=top-sql-50)

利用 left join 會填補 null 的特性去篩選出欄位

```sql
select e1.employee_id
from (
    select *
    from Employees
    where salary < 30000 AND manager_id is not null
    order by employee_id
) as e1
left join Employees as e2
on e1.manager_id = e2.employee_id
where e2.employee_id is null
order by employee_id asc
```

### [1341. Movie Rating](https://leetcode.com/problems/movie-rating/description/?envType=study-plan-v2&envId=top-sql-50)

取同一個變數名稱 results + 練習 LIMIT + 雙排序

```sql
(
  SELECT name AS results
  FROM Users u
  JOIN MovieRating r ON u.user_id = r.user_id
  GROUP BY u.user_id
  ORDER BY COUNT(*) DESC, name ASC
  LIMIT 1
)
UNION ALL
(
  SELECT title AS results
  FROM Movies m
  JOIN MovieRating r ON m.movie_id = r.movie_id
  WHERE r.created_at BETWEEN '2020-02-01' AND '2020-02-29'
  GROUP BY m.movie_id, m.title
  ORDER BY AVG(r.rating) DESC, m.title ASC
  LIMIT 1
);
```

### [602. Friend Requests II: Who Has the Most Friends](https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/description/?envType=study-plan-v2&envId=top-sql-50)

總數可直接用 requester_id + accepter_id 加總來處理，所以先用 UNION ALL 攤平就好處理了

```sql
SELECT id, COUNT(*) AS num
FROM (
  SELECT requester_id AS id FROM RequestAccepted
  UNION ALL
  SELECT accepter_id AS id FROM RequestAccepted
) AS all_ids
GROUP BY id
ORDER BY num DESC
LIMIT 1;
```