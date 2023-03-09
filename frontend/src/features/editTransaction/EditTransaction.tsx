import { useEffect, useState } from "react";
import patchTransaction from "../../api/patchTransaction";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Select from "../../components/Select";
import CategoryType from "../../utils/types/CategoryType";
import TransactionType from "../../utils/types/TransactionType";
import "./EditTransaction.css";

function editTransaction(props: {
	headerText: string;
	onSetTransactions: Function;
	onCloseWindow: Function;
	inputClassName: string;
	typeText: string;
	typeSelect: string;
	typeDatepicker: string;
	labelDescription: string;
	labelDate: string;
	labelAmount: string;
	labelCategory: string;
	labelType: string;
	transactions: Array<TransactionType>;
	categories: Array<CategoryType>;
	id: number;
	descriptionToEdit: string;
	amountToEdit: string;
	dateToEdit: string;
	typeToEdit: string;
	categoryToEdit?: string;
}) {
	const [updatedDescription, setUpdatedDescription] = useState<string>(
		props.descriptionToEdit
	);
	const [updatedAmount, setUpdatedAmount] = useState<string>(
		props.amountToEdit
	);
	const [updatedDate, setUpdatedDate] = useState<string>(props.dateToEdit);
	const [updatedType, setUpdatedType] = useState<string>(props.typeToEdit);
	const [updatedCategory, setUpdatedCategory] = useState<string | undefined>(
		props.categoryToEdit
	);

	const onlyNumbers = new RegExp("^[-0-9]+$");
	const mandatoryFields =
		updatedDescription.length > 0 &&
		onlyNumbers.test(updatedAmount) &&
		updatedDate.length > 0 &&
		updatedType !== "";

	useEffect(() => {
		const isExpense = updatedType === "Expense";
		const isPositiveAmount = !updatedAmount.includes("-");
		console.log(updatedType);
		let newAmount = updatedAmount;

		if (isExpense && isPositiveAmount) {
			newAmount = `-${newAmount}`;
			console.log(newAmount);
		} else if (!isExpense) {
			newAmount = newAmount.replace("-", "");
		}

		setUpdatedAmount(newAmount);
	}, [updatedType]);

	function editTransaction(): void {
		let updatedAmountNumber = parseInt(updatedAmount);

		let newData = {
			id: props.id,
			amount: updatedAmountNumber,
			description: updatedDescription,
			date: updatedDate,
			type: updatedType,
			categoryId: props.categories.find(
				(category) => category.name === updatedCategory
			)?.id,
		};
		let transactionsUpdated = props.transactions.map((transaction) => {
			if (props.id === transaction.id) {
				return {
					...transaction,
					...newData,
				};
			} else {
				return transaction;
			}
		});
		props.onSetTransactions(transactionsUpdated);
		patchTransaction(newData, props.id);

		props.onCloseWindow(false);
	}

	return (
		<div>
			<div className="modalOverlay">
				<div className="modalContainer">
					<div className="title">
						<Header heading={props.headerText} />
					</div>
					<div className="body">
						<Label text={props.labelDescription} />
						<Input
							type={props.typeText}
							className={props.inputClassName}
							value={updatedDescription}
							onChange={(e) => setUpdatedDescription(e.target.value)}
						/>
						<Label text={props.labelAmount} />
						<Input
							className={props.inputClassName}
							type={props.typeText}
							value={updatedAmount}
							onChange={(e) => setUpdatedAmount(e.target.value)}
						/>
						<Label text={props.labelDate} />
						<Input
							type={props.typeDatepicker}
							className={props.inputClassName}
							onChange={(e) => setUpdatedDate(e.target.value)}
						/>
						<Label text={props.labelCategory} />
						<Select
							values={props.categories.map((category) => category.name)}
							value={updatedCategory}
							onChange={(e) => setUpdatedCategory(e.target.value)}
						/>
						<Label text={props.labelType} />
						<Select
							values={["", "Expense", "Income"]}
							value={updatedType}
							onChange={(e) => setUpdatedType(e.target.value)}
						/>
					</div>
					<div className="footer">
						<Button
							name={"Save"}
							className={mandatoryFields ? "save" : "saveDisabled"}
							onClick={() => editTransaction()}
						/>
						<Button
							name={"Cancel"}
							className={"cancel"}
							onClick={() => props.onCloseWindow(false)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default editTransaction;
