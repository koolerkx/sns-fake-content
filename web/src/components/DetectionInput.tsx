import { Button, Cascader, Input, Select } from 'antd';
import { useMemo, useState } from 'react';
const { TextArea } = Input;
import { useMutation, useQueryClient } from 'react-query';
import { create } from 'zustand';
import detectText from '../api/detectText';
import History from '../types/History';

type Option = {
	value: string | number;
	label: string;
	children?: Option[];
}

const options: Option[] = [
	{
		label: "BOW",
		value: "bow",
		children: [
			{
				label: "Naive Bayes",
				value: "nb",
				children: [],
			},
			{
				label: "Logistic Regression",
				value: "lr",
				children: [],
			},
			{
				label: "Decision Tree",
				value: "dt",
				children: [],
			},
			{
				label: "Random Forest",
				value: "rf",
				children: [],
			},
			{
				label: "Support Vector Machine",
				value: "svm",
				children: [],
			},
		],
	},
	{
		label: "TF-IDF",
		value: "tfidf",
		children: [
			{
				label: "Naive Bayes",
				value: "nb",
				children: [],
			},
			{
				label: "Logistic Regression",
				value: "lr",
				children: [],
			},
			{
				label: "Decision Tree",
				value: "dt",
				children: [],
			},
			{
				label: "Random Forest",
				value: "rf",
				children: [],
			},
			{
				label: "Support Vector Machine",
				value: "svm",
				children: [],
			},
		],
	},
	{
		label: "Word2Vec",
		value: "word2vec",
		children: [
			{
				label: "Naive Bayes",
				value: "nb",
				children: [],
			},
			{
				label: "Logistic Regression",
				value: "lr",
				children: [],
			},
			{
				label: "Decision Tree",
				value: "dt",
				children: [],
			},
			{
				label: "Random Forest",
				value: "rf",
				children: [],
			},
			{
				label: "Support Vector Machine",
				value: "svm",
				children: [],
			},
			{
				label: "RNN GRU",
				value: "rnn",
				children: [],
			},
		],
	},
	{
		label: "FastText",
		value: "fasttext",
		children: [
			{
				label: "Naive Bayes",
				value: "nb",
				children: [],
			},
			{
				label: "Logistic Regression",
				value: "lr",
				children: [],
			},
			{
				label: "Decision Tree",
				value: "dt",
				children: [],
			},
			{
				label: "Random Forest",
				value: "rf",
				children: [],
			},
			{
				label: "Support Vector Machine",
				value: "svm",
				children: [],
			},
			{
				label: "RNN GRU",
				value: "rnn",
				children: [],
			},
		],
	},
	{
		label: "Transformer",
		value: "transformer",
		children: [
			{
				label: "BERT",
				value: "bert",
				children: [],
			}, {
				label: "XLNet",
				value: "xlnet",
				children: [],
			},
		],
	},
];


export const useNonpersistentDetectionOutputStore = create<History & {
	setType: (e: History['type']) => void;
	setText: (e: History['text']) => void;
	setScore: (e: History['score']) => void;
}>()(set => ({
    type: '',
	text: '',
	score: 0,
	setType: (e: History['type']) => set(() => ({ type: e })),
	setText: (e: History['text']) => set(() => ({ text: e })),
	setScore: (e: History['score']) => set(() => ({ score: e })),
}));

type DetectionInputProps = {
	showModelList?: boolean;
}

const DetectionInput: React.FC<DetectionInputProps> = (props) => {

	const store = useNonpersistentDetectionOutputStore();
	const [text, setText] = useState('');
	const queryClient = useQueryClient();
	const { mutate } = useMutation(detectText, { onSuccess: (e) => {
		queryClient.refetchQueries('getHistoryList');
		store.setText(e.text);
		store.setType(e.type);
		store.setScore(e.data);
	} });
	const [type, setType] = useState('tfidf-svm');

	return (
		<>
			<TextArea
				rows={4}
				placeholder="input the text here, the maximum length of the text is 128."
				maxLength={128}
				value={text}
				onChange={(e) => setText(e.currentTarget.value)}
				showCount
			/>
			<div style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginTop: '1.5rem',
			}}>
				{props.showModelList && <span>
					<Cascader
						onChange={(e) => setType(e.join('-'))}
						options={options}
						defaultValue={["tfidf", "svm"]}
					/>
				</span>}
				<div style={{
					display: 'flex',
					flexDirection: 'row',
					columnGap: '1rem',
				}}>
					<Button type="primary" onClick={() => text && mutate({ type, text })}>
						Detect
					</Button>

					<Button type="primary" onClick={() => setText("")}>
						Reset
					</Button>
				</div>
			</div>
		</>
	);
}

export default DetectionInput;