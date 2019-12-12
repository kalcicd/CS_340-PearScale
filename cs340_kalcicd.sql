-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Dec 11, 2019 at 10:21 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_kalcicd`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `highestRatedPears`
-- (See below for the actual view)
--
CREATE TABLE `highestRatedPears` (
`PID` int(11)
,`Date` date
,`Time` time
,`Description` varchar(255)
,`Title` varchar(255)
,`Image` varchar(1000)
,`UID` int(11)
,`Username` varchar(255)
,`Average` decimal(13,2)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `newestPears`
-- (See below for the actual view)
--
CREATE TABLE `newestPears` (
`PID` int(11)
,`Date` date
,`Time` time
,`Description` varchar(255)
,`Title` varchar(255)
,`Image` varchar(1000)
,`Username` varchar(255)
,`Average` decimal(13,2)
);

-- --------------------------------------------------------

--
-- Table structure for table `Pears`
--

CREATE TABLE `Pears` (
  `PID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Title` varchar(255) NOT NULL,
  `Image` varchar(1000) NOT NULL,
  `UID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Pears`
--

INSERT INTO `Pears` (`PID`, `Date`, `Time`, `Description`, `Title`, `Image`, `UID`) VALUES
(1, '2019-11-19', '00:00:00', 'A nice juicy one ;)', 'LOOK AT THIS PEAR', 'https://usapears.org/wp-content/uploads/2018/10/bartlett-1-1_650x750_acf_cropped.png', 4),
(2, '2019-11-19', '00:00:00', 'OH LAWWWDDD', 'SHE THICCCC', 'https://i.redd.it/h5x6pd4ztw321.jpg', 1),
(4, '2019-11-19', '00:00:00', 'see title', 'This one\'s ripe', 'https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/5347742/910/1098/m2/fpnw/wm1/seoi3zgxsxbs8mavb3bnp1nuuwhrzqiblzpm0ck4af6nyqpzd42ulnse553lplg9-.jpg?1541832965&s=086b5c9a5cc64c78314ae44a1a1ad90e', 8),
(7, '2019-11-19', '00:00:00', 'dummy thicc', 'fat pear', 'https://i.redd.it/pckr8ndxcn131.jpg', 2),
(8, '2019-11-19', '00:00:00', 'please be gentle', 'Here\'s a thin one for you guys', 'https://usapears.org/wp-content/uploads/2007/11/seckel-pear.jpg', 7),
(9, '2019-11-19', '00:00:00', 'rate 15 for 100 years of good luck', 'blessed pear', 'https://i.dailymail.co.uk/i/pix/2016/01/26/16/3098355100000578-3417642-Good_luck_One_of_the_pears_inside_the_mould_left_next_to_a_norma-a-22_1453825331750.jpg', 6),
(10, '2019-11-19', '00:00:00', 'very spookey', 'cursed pear', 'https://previews.123rf.com/images/bufka/bufka1209/bufka120900026/15087516-moldy-pear.jpg', 7),
(12, '2019-11-20', '00:00:00', 'Test pear please ignore', 'Test pear please ignore', 'https://www.bortonfruit.com/cache/img/5/5/8/c/9/558c9817ed0a4c1f371c1c32e7eab703.jpg', 11),
(62, '2019-12-07', '13:33:50', ':(', 'swag', 'https://usapears.org/wp-content/uploads/2018/10/bartlett-1-1_650x750_acf_cropped.png', 1),
(69, '2019-12-10', '23:10:00', ':)', 'A Nice Basket', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Assortment_of_pears.jpg/1280px-Assortment_of_pears.jpg', 13),
(72, '2019-12-11', '16:09:10', 'whys he on his side? what the heck? rate 15 please', 'sideways pear', 'https://images.amcnetworks.com/bbcamerica.com/wp-content/uploads/2011/09/pear.jpg', 29);

-- --------------------------------------------------------

--
-- Stand-in structure for view `pearsByUser`
-- (See below for the actual view)
--
CREATE TABLE `pearsByUser` (
`PID` int(11)
,`Date` date
,`Time` time
,`Description` varchar(255)
,`Title` varchar(255)
,`Image` varchar(1000)
,`Username` varchar(255)
,`Average` decimal(13,2)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `pearTags`
-- (See below for the actual view)
--
CREATE TABLE `pearTags` (
`Tag` varchar(255)
,`TID` int(11)
,`PID` int(11)
,`UID` int(11)
,`Title` varchar(255)
,`Description` varchar(255)
,`Image` varchar(1000)
,`Date` date
,`Time` time
,`Username` varchar(255)
,`Average` decimal(13,2)
);

-- --------------------------------------------------------

--
-- Table structure for table `Ratings`
--

CREATE TABLE `Ratings` (
  `RID` int(11) NOT NULL,
  `Score` int(11) NOT NULL,
  `PID` int(11) NOT NULL,
  `UID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Ratings`
--

INSERT INTO `Ratings` (`RID`, `Score`, `PID`, `UID`) VALUES
(1, 4, 2, 9),
(2, 15, 4, 9),
(3, 14, 8, 2),
(4, 8, 10, 6),
(6, 6, 4, 6),
(7, 4, 11, 10),
(8, 15, 2, 1),
(9, 3, 8, 4),
(10, 4, 9, 5),
(11, 6, 5, 1),
(12, 8, 10, 13),
(13, 15, 2, 13),
(14, 7, 65, 13),
(15, 8, 12, 13),
(16, 6, 9, 13),
(17, 15, 69, 13),
(18, 12, 70, 17),
(19, 4, 62, 18),
(20, 15, 69, 18),
(21, 1, 1, 24),
(22, 1, 62, 13),
(23, 9, 7, 13),
(24, 8, 72, 29),
(25, 12, 1, 29),
(26, 10, 73, 13),
(27, 8, 74, 29);

-- --------------------------------------------------------

--
-- Table structure for table `Reports`
--

CREATE TABLE `Reports` (
  `RPID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `PID` int(11) NOT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Reports`
--

INSERT INTO `Reports` (`RPID`, `Date`, `PID`, `Description`) VALUES
(1, '2019-11-19', 7, 'I do not like this pear'),
(2, '2019-11-19', 2, NULL),
(3, '2019-11-19', 2, 'Im in this image and I dont like it'),
(4, '2019-11-19', 2, 'Not a pear'),
(5, '2019-11-19', 2, 'Not a pear'),
(6, '2019-11-19', 2, 'Not a pear'),
(7, '2019-11-19', 9, 'How do i report pear'),
(8, '2019-11-19', 9, 'This pear is dumb'),
(9, '2019-11-19', 8, 'This pear is dumb'),
(10, '2019-11-19', 6, 'This pear is dumb'),
(11, '2019-12-03', 8, 'Delete this'),
(12, '2019-12-09', 7, 'This pear sucks. Reported.'),
(13, '2019-12-09', 0, 'report_hatecrime'),
(14, '2019-12-09', 0, 'report_hatecrime'),
(15, '2019-12-09', 0, 'report_hatecrime'),
(16, '2019-12-09', 0, 'report_hatecrime'),
(17, '2019-12-09', 10, 'report_hatecrime'),
(18, '2019-12-09', 10, 'report_hatecrime'),
(19, '2019-12-09', 10, 'report_hatecrime'),
(20, '2019-12-09', 10, 'report_hatecrime'),
(21, '2019-12-10', 2, 'report_nsfw'),
(22, '2019-12-10', 2, 'report_notPear'),
(23, '2019-12-10', 2, 'report_hatecrime'),
(24, '2019-12-10', 2, 'report_hatecrime'),
(25, '2019-12-10', 2, 'report_hatecrime'),
(26, '2019-12-10', 2, 'report_hatecrime'),
(27, '2019-12-10', 9, 'report_nsfw'),
(28, '2019-12-10', 65, 'report_hatecrime'),
(29, '2019-12-10', 65, 'report_nsfw');

-- --------------------------------------------------------

--
-- Table structure for table `Tags`
--

CREATE TABLE `Tags` (
  `TID` int(11) NOT NULL,
  `Tag` varchar(255) NOT NULL,
  `PID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Tags`
--

INSERT INTO `Tags` (`TID`, `Tag`, `PID`) VALUES
(1, 'good', 1),
(2, 'thicc', 2),
(3, 'juicy', 1),
(4, 'cursed', 10),
(5, 'lucky', 9),
(6, 'fat', 7),
(7, 'old', 11),
(8, 'skinny', 8),
(9, 'mysterious', 10),
(10, 'moldy', 10),
(11, 'test', 72),
(12, 'good', 72),
(13, 'juicy', 72),
(14, 'bowl', 69);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `UID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `Birthday` date NOT NULL,
  `Email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UID`, `Username`, `hash`, `salt`, `Birthday`, `Email`) VALUES
(1, 'swetti_boy', '', '', '1969-06-09', 'swettiboy@gmail.com'),
(2, 'cheesedon', '', '', '1969-06-09', 'yuhyeet@gmail.com'),
(3, 'pearLoverPreston', '', '', '1969-06-09', 'asdf@gmail.com'),
(4, 'Cool Guy', '', '', '1969-06-09', 'fdsa@gmail.com'),
(5, 'pearLuvr123', '', '', '1969-06-09', 'cats@gmail.com'),
(6, 'Jeffery E', '', '', '1969-06-09', 'lol@usa.gov'),
(7, 'JimmyNeutron', '', '', '2019-11-18', 'jimbles@gmail.com'),
(8, 'Kanye', '', '', '1983-06-09', 'ye@gmail.com'),
(9, 'CrocodileDundee', '', '', '1969-06-09', 'weji@gmail.com'),
(10, 'shrek', '', '', '1969-06-09', 'shrek@gmail.com'),
(11, 'bobby_basketball_1999', '', '', '1999-11-05', 'Test pear please ignore'),
(12, 'Foo', '', '', '2011-10-10', 'user@gmail.com'),
(13, 'testUser', '1uDa5j7dqdYoNnVt9iET57p4TVA0fnwbR6ZdRZN0iVJ1ITObHBOXQ/XZ+tkBGAes9egQUZliG+PBS++4ECFU9Wbsy7GZOP/IN3DnJCvQ+iN1gcn9wGBP7WTv2bLjz0Yw2paPpMYBxhKgBoEdEES94otYpkHzhreANqidt+/I7YE=', 'ZdtZhIp167KEDt3o2vyEBU2lCecl7tJn6cCDWSg5iRqC+FtstinJXfGoqeNsvKn5u12Bs3TfkbUKX3dKwi23Zw==', '2019-01-01', 'test@gmail.com'),
(16, 'pear_god', '0GP60iYTFmRz/8MEPQ1m03Qw73xDFK/I8Q+15dYi2oQ1ms4VWSAs106Q7CFnwQiGNc1gAswNR9pc8JWy8Sv0sedO0UZyBJJvF/lSgqNpyNOpWlVcge3KnZArJE7kOEvDhbCGeEKvQPyfH1GmkFUGNZgaN5dqFwEk2zBgOQMDpwM=', 'pwrOH/fqzYBO913EBNajb1D6FRsK4RLHtd9ue0nYm7P1OfjDobRIslUhJWtCUv0w8fYH2Pf5LR2biSDoSQuUTQ==', '2019-12-01', 'lilb@gmail.com'),
(17, 'comma_kaze', 'o+0fxhGYwg5et2D+pGnZ4Uwsf0l79JwP0GoLq3WYhEPAnjnQws3WzuMcVvrkdWVX+dJg15t/xhQZ2LnsCEy4m+TcGecZ+WiXtpyV7dlGtEpwFu8JB1WFnPw5ikk1ATbaFMSp1aYQeutwSboCoNnPrNQ/5pSwCmR0hKas/Fa32I8=', 'FiQ1yc/AkDvHVYM6xJ/ewupcRu7z8N2GsK1E6wHWlOFIFZx+xXoXT5/laLrN2/368jKU71CT2Pc43sexsYDxkQ==', '1926-12-01', 'kyle@kyle.com'),
(18, 'epicson', 'LPgf/1OpAwcJy6RBl00zORwj2etFwHb8/JR52Ab+x5bBSmy24tc33ZorjUVogmy9Px56dtjrIQKmT14TAaawXD7nOKB1wesH7pcbvhOXWc544eYtzXGFVgoiVDdBlNUL56jBwYXqL+Zpdykp9KIRoQTF9KyI747qRQ41qJno69o=', 'UaJWAi3LAvwFbNX+xoEsvKHzTgjO9ZMMyIUig2iAbc6qNh9wjizCLw130CfKRhD1ZIO5pilXQs+zJrihf8noEg==', '2019-12-04', 'test@test.com'),
(19, 'swagman', 'BBR+xHIKOi0Ckn52bGpaXJZaOOwjsCnuAEBNyFSAP+JjP2Vjn3yNDJJDGlfJ9GP6agm2BbGMl2UjKOCcrQpFg/S3ukOZNFuWwi4GZegfa9lyMwi9D+hPyXzfxs1Tes6sQrKeGZM4zYalRJ0AWq5XQGW4ZRfPtJuq/A6m/iCVUdY=', 'aPZliBkWPcQCSLEuu8M53mwQMjjWZFwLihxYUyihjRqV9Ej4j60ysjAykOLxIgFR2Pn85BpQsrEam6jZUNO4nA==', '2019-11-26', 'a'),
(20, 'abcd', '4CgJjfZPLL4qLaRS9IMHfqNj9Z4zXxrBlW0jgw3T/peTy+ktM6fJ6n7So3P0q29XDdSmRu3CNdFaRjUSPxs4NgU21mphkQkfQuTxSIlJ2xw3R8wuRnG8niY72ZQywOYnIpODcVEnFboky/T1BX1e7RiMujnzWhTbBc1E86bIgl0=', '62T8w3xy6qwwD63hLJBv1LqOFTwtgN5DymKpl695EOOZAXTyxXJtCONZfXHuZBg8mCnADVMSwZBqL7IcroGkrw==', '2019-11-27', 'test'),
(21, 'swagger', 'QNglkpT7Iny3PiNNvZVjGQIfmgr6+Z8OXHkJPBfj5XHPqth7pz+CVPcgbSTxs0HS2JyWMoS69Ou5ivUuulIZSXob9DilwIpN/AoDJkLjS0va+cPydmbL8VX5faTox+kEXrHIo3bHREbNweJspcThK8Ct8T4MIycO6ez0XhwgEMM=', 'e4iojAfyqpZUkLoGjK02SQDO8mxC9vslu8oPsOmYd52D/VeSwX2UtN0mUWfs0tcX0iOiVn0heqSauxHKFneHcg==', '2019-11-30', 'test'),
(22, 'epic guy', 'ycMhapKiwr/aB62XEoZrfqJrnLO43nfGnWOpJt/q/k9QSnJED3TyDBpo4epjpJntmSPh0WcCynkzBwtnW8IlI8I3paVgXof2LKzW+TmABCVGdzNEKsmxfux0+ephkdKNGf/133UeU42i5RaKtnG1byM4nqQPpAwpFdol5bBc09Q=', 'QKlmisZk0LWLlBIdJQOr4DwABy7Cs5oq1esfI0/ZwpDi0cV1xAoA9IGqPnYUH238i2kpumANa+q+KedazkzIuQ==', '2019-11-24', '1'),
(23, 'swag commander', 'FQmP4lvcb5yL/wF8zED8Wk7zkQgdgfbOyYb3ejTGj9BCdPaA6C7wdbGyQfVcPMUXihqJRt1hw3VlKioDWzZPHgu8XTu0dAFHx4y91JQbU1HiyR2nxF/12k5n2t/7pEhqYRE+eeMCayZqpZwRJq/YiD4qa2MW1tqDo9cJC5h6u0U=', 'YeRurXD91maWWMYR5BQWCDWZWxVQ7zL055X6uTVUIwRXAjRo3rEJAAYwHuaEvPs9CDlodChxDyJLIsyBiTWcFA==', '2019-11-27', '2'),
(24, 'marissa', 'bAQqmZRAGH0Akpy4mAexOmGisk1NW0dUYE7n7NWACOcG5P5WmFT+jzsBB3k644WviQeZWTTn2nryfxfvfNfM1WrXZ/sYwMR+AHyhEdTFM8EuiZNwquyP5Bwk6rvCHZCpd1T9sCoqCoyByDhMrgRIKueEXvIhc2oNChBD+uwbx4A=', '4VtD0VqCiFkq0km/tiyuHXtQxkmnUrjJwWeSGkOtRyC7S3aWHqE/NpACJylWxTEK3U2xnDRkfaUhCIEUvFNXHg==', '2019-11-24', 'cool'),
(25, 'gamer', 'PGs1+K4Zw15twk36v4Jh60clEga2IxPhXDEg6ywjvdgwlYvi4VRAvfnVnt+ywXJ26h96JeJm3p+rMpr2xiSul/PhuCB0Z0NyqAm6D23qZK9fxGx7vlWD7S4m1lsrKpxIUEZa6UmusMK5OY6DFMCfsek7tCRPJ1esiytZmC6asyA=', 'rV6pgwlXH7iTQUI3I0Jy0uTrlQ5v3GgNr4BQEabBMF8HUMnGGW9bJrFJL0TesMooxMh5IuVRGAYSKolySz42xg==', '0000-00-00', 'swag'),
(29, 'a', 'SpJ2StezJ28DjtZI5weS/wfWcXueDRQu1giocmEBkBQ79cWLICVLPqy7kUADv9L/pjXDRSQRrRgWG/NAPyQ6n96ArEWF0XH0a0R9tTRnN8ojDxad20MNd1bHdk0mwJnc3db1jU0TZcB0m8Afdy/mH4iPYQwou0rwyi+sqjd9IVI=', 'TvUp5rOL065PLg1Y4tlMpfnkunWN6svbSWE14+o7NV0S9QEMKAwU7BGhBfXUGLAkWBEOBiQ3k95WlOHlBA9/0Q==', '2019-11-24', 'a');

--
-- Triggers `Users`
--
DELIMITER $$
CREATE TRIGGER `exterminate pears` AFTER DELETE ON `Users` FOR EACH ROW DELETE
FROM Pears
WHERE UID = inserted.UID
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure for view `highestRatedPears`
--
DROP TABLE IF EXISTS `highestRatedPears`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cs340_kalcicd`@`%` SQL SECURITY DEFINER VIEW `highestRatedPears`  AS  select `Pears`.`PID` AS `PID`,`Pears`.`Date` AS `Date`,`Pears`.`Time` AS `Time`,`Pears`.`Description` AS `Description`,`Pears`.`Title` AS `Title`,`Pears`.`Image` AS `Image`,`Pears`.`UID` AS `UID`,`Users`.`Username` AS `Username`,`averageScores`.`Average` AS `Average` from ((`Pears` left join (select round(avg(`Ratings`.`Score`),2) AS `Average`,`Ratings`.`PID` AS `PID` from `Ratings` group by `Ratings`.`PID`) `averageScores` on(`Pears`.`PID` = `averageScores`.`PID`)) join `Users` on(`Pears`.`UID` = `Users`.`UID`)) where `Pears`.`UID` = `Users`.`UID` order by `averageScores`.`Average` desc ;

-- --------------------------------------------------------

--
-- Structure for view `newestPears`
--
DROP TABLE IF EXISTS `newestPears`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cs340_kalcicd`@`%` SQL SECURITY DEFINER VIEW `newestPears`  AS  select `Pears`.`PID` AS `PID`,`Pears`.`Date` AS `Date`,`Pears`.`Time` AS `Time`,`Pears`.`Description` AS `Description`,`Pears`.`Title` AS `Title`,`Pears`.`Image` AS `Image`,`Users`.`Username` AS `Username`,`averageScores`.`Average` AS `Average` from ((`Pears` left join (select round(avg(`Ratings`.`Score`),2) AS `Average`,`Ratings`.`PID` AS `PID` from `Ratings` group by `Ratings`.`PID`) `averageScores` on(`Pears`.`PID` = `averageScores`.`PID`)) join `Users` on(`Pears`.`UID` = `Users`.`UID`)) where `Pears`.`UID` = `Users`.`UID` order by `Pears`.`PID` desc ;

-- --------------------------------------------------------

--
-- Structure for view `pearsByUser`
--
DROP TABLE IF EXISTS `pearsByUser`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cs340_kalcicd`@`%` SQL SECURITY DEFINER VIEW `pearsByUser`  AS  select `Pears`.`PID` AS `PID`,`Pears`.`Date` AS `Date`,`Pears`.`Time` AS `Time`,`Pears`.`Description` AS `Description`,`Pears`.`Title` AS `Title`,`Pears`.`Image` AS `Image`,`Users`.`Username` AS `Username`,`averageScores`.`Average` AS `Average` from ((`Pears` left join (select round(avg(`Ratings`.`Score`),2) AS `Average`,`Ratings`.`PID` AS `PID` from `Ratings` group by `Ratings`.`PID`) `averageScores` on(`Pears`.`PID` = `averageScores`.`PID`)) join `Users` on(`Pears`.`UID` = `Users`.`UID`)) where `Pears`.`UID` = `Users`.`UID` order by `Pears`.`UID` desc ;

-- --------------------------------------------------------

--
-- Structure for view `pearTags`
--
DROP TABLE IF EXISTS `pearTags`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cs340_kalcicd`@`%` SQL SECURITY DEFINER VIEW `pearTags`  AS  select `Tags`.`Tag` AS `Tag`,`Tags`.`TID` AS `TID`,`Pears`.`PID` AS `PID`,`Pears`.`UID` AS `UID`,`Pears`.`Title` AS `Title`,`Pears`.`Description` AS `Description`,`Pears`.`Image` AS `Image`,`Pears`.`Date` AS `Date`,`Pears`.`Time` AS `Time`,`Users`.`Username` AS `Username`,`averageScores`.`Average` AS `Average` from (((`Pears` left join (select round(avg(`Ratings`.`Score`),2) AS `Average`,`Ratings`.`PID` AS `PID` from `Ratings` group by `Ratings`.`PID`) `averageScores` on(`Pears`.`PID` = `averageScores`.`PID`)) join `Tags` on(`Pears`.`PID` = `Tags`.`PID`)) join `Users` on(`Pears`.`UID` = `Users`.`UID`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Pears`
--
ALTER TABLE `Pears`
  ADD PRIMARY KEY (`PID`),
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `Ratings`
--
ALTER TABLE `Ratings`
  ADD PRIMARY KEY (`RID`),
  ADD KEY `PID` (`PID`,`UID`);

--
-- Indexes for table `Reports`
--
ALTER TABLE `Reports`
  ADD PRIMARY KEY (`RPID`),
  ADD KEY `PID` (`PID`);

--
-- Indexes for table `Tags`
--
ALTER TABLE `Tags`
  ADD PRIMARY KEY (`TID`),
  ADD KEY `PID` (`PID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Pears`
--
ALTER TABLE `Pears`
  MODIFY `PID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `Ratings`
--
ALTER TABLE `Ratings`
  MODIFY `RID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `Reports`
--
ALTER TABLE `Reports`
  MODIFY `RPID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `Tags`
--
ALTER TABLE `Tags`
  MODIFY `TID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
