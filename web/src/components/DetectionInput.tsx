import { Button, Input, Select } from 'antd';
import { useMemo, useState } from 'react';
const { TextArea } = Input;
import { useMutation, useQueryClient } from 'react-query';
import { create } from 'zustand';
import detectText from '../api/detectText';
import History from '../types/History';

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
	const options = useMemo(() => [
		{ value: 'tfidf-svm', label: 'TFIDF SVM' },
		{ value: 'tfidf-nb', label: 'TFIDF naive bayes' },
		{ value: 'tfidf-rf', label: 'TFIDF random forest' },
		{ value: 'tfidf-cnn', label: 'TFIDF CNN' },
		{ value: 'tfidf-rnn', label: 'TFIDF RNN' },
		{ value: 'word2vec-svm', label: 'Word2Vec SVM' },
		{ value: 'word2vec-rf', label: 'Word2Vec random forest' },
		{ value: 'word2vec-cnn', label: 'Word2Vec CNN' },
		{ value: 'word2vec-rnn', label: 'Word2Vec RNN' },
		{ value: 'xlnet', label: 'XLNet' },
		{ value: 'bert', label: 'BERT' },
	], []);
	const [type, setType] = useState(options.at(0)?.value || 'tfidf-svm');

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
					<Select
						defaultValue="lucy"
						onChange={(e) => setType(e)}
						value={type}
						options={options}
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