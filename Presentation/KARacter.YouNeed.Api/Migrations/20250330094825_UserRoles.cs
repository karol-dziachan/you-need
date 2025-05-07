using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KARacter.YouNeed.Api.Migrations
{
    /// <inheritdoc />
    public partial class UserRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanyBreakSettings_Company_CompanyId",
                table: "CompanyBreakSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyBreakSettings_Company_CompanyId1",
                table: "CompanyBreakSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyPayment_Company_CompaniesId",
                table: "CompanyPayment");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyPayment_Payment_PaymentsId",
                table: "CompanyPayment");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyPaymentMethod_Company_CompaniesId",
                table: "CompanyPaymentMethod");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyPaymentMethod_PaymentMethod_PaymentMethodsId",
                table: "CompanyPaymentMethod");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyUser_Company_CompanyId",
                table: "CompanyUser");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyUser_UserRole_UserRoleId",
                table: "CompanyUser");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyUser_UserRole_UserRoleId1",
                table: "CompanyUser");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyUser_User_UserId",
                table: "CompanyUser");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyUser_User_UserId1",
                table: "CompanyUser");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyWorkArea_Company_CompanyId",
                table: "CompanyWorkArea");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyWorkArea_Company_CompanyId1",
                table: "CompanyWorkArea");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyWorkSchedule_Company_CompanyId",
                table: "CompanyWorkSchedule");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyWorkSchedule_Company_CompanyId1",
                table: "CompanyWorkSchedule");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_PaymentMethod_PaymentMethodId",
                table: "Payment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRole",
                table: "UserRole");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PaymentMethod",
                table: "PaymentMethod");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Payment",
                table: "Payment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyWorkSchedule",
                table: "CompanyWorkSchedule");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyWorkArea",
                table: "CompanyWorkArea");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyUser",
                table: "CompanyUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Company",
                table: "Company");

            migrationBuilder.RenameTable(
                name: "UserRole",
                newName: "UserRoles");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "PaymentMethod",
                newName: "PaymentMethods");

            migrationBuilder.RenameTable(
                name: "Payment",
                newName: "Payments");

            migrationBuilder.RenameTable(
                name: "CompanyWorkSchedule",
                newName: "CompanyWorkSchedules");

            migrationBuilder.RenameTable(
                name: "CompanyWorkArea",
                newName: "CompanyWorkAreas");

            migrationBuilder.RenameTable(
                name: "CompanyUser",
                newName: "CompanyUsers");

            migrationBuilder.RenameTable(
                name: "Company",
                newName: "Companies");

            migrationBuilder.RenameIndex(
                name: "IX_Payment_PaymentMethodId",
                table: "Payments",
                newName: "IX_Payments_PaymentMethodId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyWorkSchedule_CompanyId1",
                table: "CompanyWorkSchedules",
                newName: "IX_CompanyWorkSchedules_CompanyId1");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyWorkSchedule_CompanyId",
                table: "CompanyWorkSchedules",
                newName: "IX_CompanyWorkSchedules_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyWorkArea_CompanyId1",
                table: "CompanyWorkAreas",
                newName: "IX_CompanyWorkAreas_CompanyId1");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyWorkArea_CompanyId",
                table: "CompanyWorkAreas",
                newName: "IX_CompanyWorkAreas_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyUser_UserRoleId1",
                table: "CompanyUsers",
                newName: "IX_CompanyUsers_UserRoleId1");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyUser_UserRoleId",
                table: "CompanyUsers",
                newName: "IX_CompanyUsers_UserRoleId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyUser_UserId1",
                table: "CompanyUsers",
                newName: "IX_CompanyUsers_UserId1");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyUser_UserId",
                table: "CompanyUsers",
                newName: "IX_CompanyUsers_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyUser_CompanyId",
                table: "CompanyUsers",
                newName: "IX_CompanyUsers_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRoles",
                table: "UserRoles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PaymentMethods",
                table: "PaymentMethods",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Payments",
                table: "Payments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyWorkSchedules",
                table: "CompanyWorkSchedules",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyWorkAreas",
                table: "CompanyWorkAreas",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyUsers",
                table: "CompanyUsers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Companies",
                table: "Companies",
                column: "Id");

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "Id", "CreatedDateTime", "Description", "IsActive", "ModifiedDateTime", "Name" },
                values: new object[,]
                {
                    { new Guid("1ac54eb2-6d9a-47eb-9afe-5157927b2496"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Administrator", true, null, "Admin" },
                    { new Guid("60569508-803f-4e05-8c3c-c4c92ece4b82"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Administrator firmy", true, null, "CompanyAdmin" },
                    { new Guid("83688eaa-91a0-487d-a8e8-2c1dac25e23b"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Klient", true, null, "Customer" },
                    { new Guid("b1f0f663-2c0d-432c-b81a-10fc3e380e37"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Pracownik firmy", true, null, "CompanyEmployee" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyBreakSettings_Companies_CompanyId",
                table: "CompanyBreakSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyBreakSettings_Companies_CompanyId1",
                table: "CompanyBreakSettings",
                column: "CompanyId1",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyPayment_Companies_CompaniesId",
                table: "CompanyPayment",
                column: "CompaniesId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyPayment_Payments_PaymentsId",
                table: "CompanyPayment",
                column: "PaymentsId",
                principalTable: "Payments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyPaymentMethod_Companies_CompaniesId",
                table: "CompanyPaymentMethod",
                column: "CompaniesId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyPaymentMethod_PaymentMethods_PaymentMethodsId",
                table: "CompanyPaymentMethod",
                column: "PaymentMethodsId",
                principalTable: "PaymentMethods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyUsers_Companies_CompanyId",
                table: "CompanyUsers",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyUsers_UserRoles_UserRoleId",
                table: "CompanyUsers",
                column: "UserRoleId",
                principalTable: "UserRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyUsers_UserRoles_UserRoleId1",
                table: "CompanyUsers",
                column: "UserRoleId1",
                principalTable: "UserRoles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyUsers_Users_UserId",
                table: "CompanyUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyUsers_Users_UserId1",
                table: "CompanyUsers",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyWorkAreas_Companies_CompanyId",
                table: "CompanyWorkAreas",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyWorkAreas_Companies_CompanyId1",
                table: "CompanyWorkAreas",
                column: "CompanyId1",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyWorkSchedules_Companies_CompanyId",
                table: "CompanyWorkSchedules",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyWorkSchedules_Companies_CompanyId1",
                table: "CompanyWorkSchedules",
                column: "CompanyId1",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_PaymentMethods_PaymentMethodId",
                table: "Payments",
                column: "PaymentMethodId",
                principalTable: "PaymentMethods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanyBreakSettings_Companies_CompanyId",
                table: "CompanyBreakSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyBreakSettings_Companies_CompanyId1",
                table: "CompanyBreakSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyPayment_Companies_CompaniesId",
                table: "CompanyPayment");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyPayment_Payments_PaymentsId",
                table: "CompanyPayment");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyPaymentMethod_Companies_CompaniesId",
                table: "CompanyPaymentMethod");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyPaymentMethod_PaymentMethods_PaymentMethodsId",
                table: "CompanyPaymentMethod");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyUsers_Companies_CompanyId",
                table: "CompanyUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyUsers_UserRoles_UserRoleId",
                table: "CompanyUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyUsers_UserRoles_UserRoleId1",
                table: "CompanyUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyUsers_Users_UserId",
                table: "CompanyUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyUsers_Users_UserId1",
                table: "CompanyUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyWorkAreas_Companies_CompanyId",
                table: "CompanyWorkAreas");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyWorkAreas_Companies_CompanyId1",
                table: "CompanyWorkAreas");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyWorkSchedules_Companies_CompanyId",
                table: "CompanyWorkSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyWorkSchedules_Companies_CompanyId1",
                table: "CompanyWorkSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_PaymentMethods_PaymentMethodId",
                table: "Payments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRoles",
                table: "UserRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Payments",
                table: "Payments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PaymentMethods",
                table: "PaymentMethods");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyWorkSchedules",
                table: "CompanyWorkSchedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyWorkAreas",
                table: "CompanyWorkAreas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyUsers",
                table: "CompanyUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Companies",
                table: "Companies");

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: new Guid("1ac54eb2-6d9a-47eb-9afe-5157927b2496"));

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: new Guid("60569508-803f-4e05-8c3c-c4c92ece4b82"));

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: new Guid("83688eaa-91a0-487d-a8e8-2c1dac25e23b"));

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: new Guid("b1f0f663-2c0d-432c-b81a-10fc3e380e37"));

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "UserRoles",
                newName: "UserRole");

            migrationBuilder.RenameTable(
                name: "Payments",
                newName: "Payment");

            migrationBuilder.RenameTable(
                name: "PaymentMethods",
                newName: "PaymentMethod");

            migrationBuilder.RenameTable(
                name: "CompanyWorkSchedules",
                newName: "CompanyWorkSchedule");

            migrationBuilder.RenameTable(
                name: "CompanyWorkAreas",
                newName: "CompanyWorkArea");

            migrationBuilder.RenameTable(
                name: "CompanyUsers",
                newName: "CompanyUser");

            migrationBuilder.RenameTable(
                name: "Companies",
                newName: "Company");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_PaymentMethodId",
                table: "Payment",
                newName: "IX_Payment_PaymentMethodId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyWorkSchedules_CompanyId1",
                table: "CompanyWorkSchedule",
                newName: "IX_CompanyWorkSchedule_CompanyId1");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyWorkSchedules_CompanyId",
                table: "CompanyWorkSchedule",
                newName: "IX_CompanyWorkSchedule_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyWorkAreas_CompanyId1",
                table: "CompanyWorkArea",
                newName: "IX_CompanyWorkArea_CompanyId1");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyWorkAreas_CompanyId",
                table: "CompanyWorkArea",
                newName: "IX_CompanyWorkArea_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyUsers_UserRoleId1",
                table: "CompanyUser",
                newName: "IX_CompanyUser_UserRoleId1");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyUsers_UserRoleId",
                table: "CompanyUser",
                newName: "IX_CompanyUser_UserRoleId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyUsers_UserId1",
                table: "CompanyUser",
                newName: "IX_CompanyUser_UserId1");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyUsers_UserId",
                table: "CompanyUser",
                newName: "IX_CompanyUser_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyUsers_CompanyId",
                table: "CompanyUser",
                newName: "IX_CompanyUser_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRole",
                table: "UserRole",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Payment",
                table: "Payment",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PaymentMethod",
                table: "PaymentMethod",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyWorkSchedule",
                table: "CompanyWorkSchedule",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyWorkArea",
                table: "CompanyWorkArea",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyUser",
                table: "CompanyUser",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Company",
                table: "Company",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyBreakSettings_Company_CompanyId",
                table: "CompanyBreakSettings",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyBreakSettings_Company_CompanyId1",
                table: "CompanyBreakSettings",
                column: "CompanyId1",
                principalTable: "Company",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyPayment_Company_CompaniesId",
                table: "CompanyPayment",
                column: "CompaniesId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyPayment_Payment_PaymentsId",
                table: "CompanyPayment",
                column: "PaymentsId",
                principalTable: "Payment",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyPaymentMethod_Company_CompaniesId",
                table: "CompanyPaymentMethod",
                column: "CompaniesId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyPaymentMethod_PaymentMethod_PaymentMethodsId",
                table: "CompanyPaymentMethod",
                column: "PaymentMethodsId",
                principalTable: "PaymentMethod",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyUser_Company_CompanyId",
                table: "CompanyUser",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyUser_UserRole_UserRoleId",
                table: "CompanyUser",
                column: "UserRoleId",
                principalTable: "UserRole",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyUser_UserRole_UserRoleId1",
                table: "CompanyUser",
                column: "UserRoleId1",
                principalTable: "UserRole",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyUser_User_UserId",
                table: "CompanyUser",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyUser_User_UserId1",
                table: "CompanyUser",
                column: "UserId1",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyWorkArea_Company_CompanyId",
                table: "CompanyWorkArea",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyWorkArea_Company_CompanyId1",
                table: "CompanyWorkArea",
                column: "CompanyId1",
                principalTable: "Company",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyWorkSchedule_Company_CompanyId",
                table: "CompanyWorkSchedule",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyWorkSchedule_Company_CompanyId1",
                table: "CompanyWorkSchedule",
                column: "CompanyId1",
                principalTable: "Company",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_PaymentMethod_PaymentMethodId",
                table: "Payment",
                column: "PaymentMethodId",
                principalTable: "PaymentMethod",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
