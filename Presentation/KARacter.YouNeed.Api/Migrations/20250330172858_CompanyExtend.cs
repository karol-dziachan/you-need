using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KARacter.YouNeed.Api.Migrations
{
    /// <inheritdoc />
    public partial class CompanyExtend : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: new Guid("165e4abc-b865-4a0f-8166-4cadee1221fa"));

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: new Guid("9b8c9cad-d76d-4de8-a3e3-3568251bc321"));

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: new Guid("b6ab7a7d-3e3d-41f4-b6b9-0562ea2c392c"));

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: new Guid("cb35649e-0b78-48fb-94bc-a150994c9988"));

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "Id", "CreatedDateTime", "Description", "IsActive", "ModifiedDateTime", "Name" },
                values: new object[,]
                {
                    { new Guid("2d6e1b60-1071-4fff-b1bd-ee720c271c3f"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Pracownik firmy", true, null, "CompanyEmployee" },
                    { new Guid("3561a3cf-6735-4309-b6ac-84ce7de98091"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Administrator firmy", true, null, "CompanyAdmin" },
                    { new Guid("9d0e6b3a-09a5-4a40-bdfa-3ab200370936"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Administrator", true, null, "Admin" },
                    { new Guid("dbd430a9-b6e0-498d-8f79-9e6b2a7e010f"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Klient", true, null, "Customer" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: new Guid("2d6e1b60-1071-4fff-b1bd-ee720c271c3f"));

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: new Guid("3561a3cf-6735-4309-b6ac-84ce7de98091"));

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: new Guid("9d0e6b3a-09a5-4a40-bdfa-3ab200370936"));

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: new Guid("dbd430a9-b6e0-498d-8f79-9e6b2a7e010f"));

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Companies",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "Id", "CreatedDateTime", "Description", "IsActive", "ModifiedDateTime", "Name" },
                values: new object[,]
                {
                    { new Guid("165e4abc-b865-4a0f-8166-4cadee1221fa"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Administrator", true, null, "Admin" },
                    { new Guid("9b8c9cad-d76d-4de8-a3e3-3568251bc321"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Administrator firmy", true, null, "CompanyAdmin" },
                    { new Guid("b6ab7a7d-3e3d-41f4-b6b9-0562ea2c392c"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Pracownik firmy", true, null, "CompanyEmployee" },
                    { new Guid("cb35649e-0b78-48fb-94bc-a150994c9988"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Klient", true, null, "Customer" }
                });
        }
    }
}
