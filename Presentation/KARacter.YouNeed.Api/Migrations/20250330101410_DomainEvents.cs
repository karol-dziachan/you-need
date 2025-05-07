using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KARacter.YouNeed.Api.Migrations
{
    /// <inheritdoc />
    public partial class DomainEvents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateTable(
                name: "DomainEvents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    HandledDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsHandled = table.Column<bool>(type: "bit", nullable: false),
                    EventType = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EventData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EventSource = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EventResult = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EventError = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RetryCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DomainEvents", x => x.Id);
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DomainEvents");

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
        }
    }
}
