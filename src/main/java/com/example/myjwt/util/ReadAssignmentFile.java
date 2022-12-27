package com.example.myjwt.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.apache.poi.ss.usermodel.Cell;
//import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.FileInputStream;  
import java.io.IOException;  
import org.apache.poi.hssf.usermodel.HSSFSheet;  
import org.apache.poi.hssf.usermodel.HSSFWorkbook;  
import org.apache.poi.ss.usermodel.Cell;  
import org.apache.poi.ss.usermodel.FormulaEvaluator;  
import org.apache.poi.ss.usermodel.Row;  

public class ReadAssignmentFile {

	

	public static void main(String[] args) {
		String xmlFile = "C:\\Users\\254395\\Downloads\\AssignmentListing_9_15_2022.xls";
		//String xmlFile = "C:\\Users\\254395\\OneDrive - Cognizant\\Cognizant\\Accounts\\ADM\\JPMC\\Operations\\NBL.xlsx";
		try {
			FileInputStream file = new FileInputStream(new File(xmlFile));

			// Create Workbook instance holding reference to .xlsx file
			//XSSFWorkbook workbook = new XSSFWorkbook(file);
			HSSFWorkbook wbk =new HSSFWorkbook(file);   

			// Get first/desired sheet from the workbook
			//XSSFSheet sheet = workbook.getSheetAt(0);
			HSSFSheet sheet=wbk.getSheetAt(0);  

			// Iterate through each rows one by one
			Iterator<Row> rowIterator = sheet.iterator();
			while (rowIterator.hasNext()) {
				Row row = rowIterator.next();
				// For each row, iterate through all the columns
				Iterator<Cell> cellIterator = row.cellIterator();

				while (cellIterator.hasNext()) {
					Cell cell = cellIterator.next();

					switch (cell.getCellType()) {

					case NUMERIC:
						System.out.print(cell.getNumericCellValue() + "\t");
						break;
					case STRING:
						System.out.print(cell.getStringCellValue() + "\t");
						break;
					}
					// Check the cell type and format accordingly
				}
				System.out.println("\n");
			}

			file.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
